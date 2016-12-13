/**
 * Created by leibown on 2016/12/11.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    ListView,
    ActivityIndicator,
    Dimensions,
    RefreshControl
} from 'react-native';
import request from '../common/request';
import Item from './Item';
import Detail from './Detail';

const config = require('../common/config');

var cachedResult = {
    nextPage: 1,
    items: [],
    total: 0
};
export default class List extends Component {

    constructor(props) {
        super(props);
        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRows([]),
            isLoadingTail: false,
            isRefreshing: false
        };
    }

    componentDidMount() {
        this._fetchData(1);
    }

    _fetchData = (page) => {
        let that = this;
        if (page !== 0)
            this.setState({
                isLoadingTail: true
            });
        else
            this.setState({
                isRefreshing: true
            });
        request
            .get(config.api.base + config.api.list, {
                accessToken: 'sbdsad',
                page: page
            })
            .then((data) => {
                if (data.success) {
                    let items = cachedResult.items.slice();
                    if (page !== 0) {
                        items = items.concat(data.data);
                        cachedResult.nextPage += 1;
                    } else {
                        items = data.data.concat(items);
                    }

                    cachedResult.items = items;
                    cachedResult.total = data.total;
                    setTimeout(() => {
                        if (page !== 0)
                            that.setState({
                                dataSource: that.state.dataSource.cloneWithRows(cachedResult.items),
                                isLoadingTail: false
                            });
                        else
                            that.setState({
                                dataSource: that.state.dataSource.cloneWithRows(cachedResult.items),
                                isRefreshing: false
                            });
                    }, 2000);
                }
            })
            .catch((error) => {
                console.error(error);
                if (page !== 0)
                    this.setState({
                        isLoadingTail: false
                    });
                else
                    this.setState({
                        isRefreshing: false
                    });
            });
    };

    _renderRow = (row) => {
        return <Item
            key={row._id}
            onSelect={() => this._loadPage(row)}
            row={row}/>;
    };

    _hasMore = () => {
        return cachedResult.items.length !== cachedResult.total;
    };

    _fetchMoreData = () => {
        console.log('加载更多');
        if (!this._hasMore() || this.state.isLoadingTail) {
            return;
        }
        let page = cachedResult.nextPage;
        this._fetchData(page);
    };

    _onRefresh = () => {
        if (!this._hasMore() || this.state.isRefreshing) {
            return;
        }

        this._fetchData(0);
    };

    _renderFooter = () => {
        if (!this._hasMore() && cachedResult.total !== 0) {
            return (
                <View style={styles.loadingMore}>
                    <Text style={styles.loadingText}>没有更多了</Text>
                </View>
            )
        }

        if (!this.state.isLoadingTail) {
            return (
                <View style={styles.loadingMore}/>);
        }

        return (
            <ActivityIndicator style={styles.loadingMore}/>
        );
    };

    _loadPage = (row) => {
        this.props.navigator.push({
            name: 'detail',
            component: Detail,
            params: {
                data: row
            }
        });
    };

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>列表界面</Text>
                </View>
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={this._renderRow}
                    enableEmptySections={true}
                    automaticallyAdjustContentInsets={false}
                    onEndReached={this._fetchMoreData}
                    onEndReachedTreshold={20}
                    renderFooter={this._renderFooter}
                    showsVerticalScrollIndicator={false}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.isRefreshing}
                            onRefresh={this._onRefresh}
                            tintColor="#ff0000"
                            title='拼命加载中...'
                        />
                    }
                />
            </View>
        );
    }

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
    header: {
        paddingTop: 25,
        paddingBottom: 12,
        backgroundColor: '#ee735c'
    },
    headerTitle: {
        color: '#fff',
        fontSize: 16,
        textAlign: 'center',
        fontWeight: '600'
    },

    loadingMore: {
        marginVertical: 20,
    },

    loadingText: {
        color: '#777',
        textAlign: 'center'
    }


});