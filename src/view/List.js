/**
 * Created by leibown on 2016/12/11.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    ListView,
    TouchableHighlight,
    Image,
    ActivityIndicator,
    Dimensions
} from 'react-native';
import request from '../common/request'


const config = require('../common/config');
const width = Dimensions.get('window').width;


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
        };
    }

    componentDidMount() {
        this._fetchData(1);
    }

    _fetchData = (page) => {
        let that = this;
        this.setState({
            isLoadingTail: true
        });
        request
            .get(config.api.base + config.api.list, {
                accessToken: 'sbdsad',
                page: page
            })
            .then((data) => {
                if (data.success) {
                    let items = cachedResult.items.slice();
                    items = items.concat(data.data);
                    cachedResult.items = items;
                    cachedResult.total = data.total;

                    setTimeout(() => {
                        that.setState({
                            dataSource: that.state.dataSource.cloneWithRows(cachedResult.items),
                            isLoadingTail: false
                        });
                    }, 2000);
                }
            })
            .catch((error) => {
                console.error(error);
                this.setState({
                    isLoadingTail: false
                });
            });
    };

    _renderRow = (row) => {
        return (
            <TouchableHighlight>
                <View style={styles.item}>
                    <Text style={styles.title}>{row.title}</Text>
                    <Image source={{uri: row.thumb}} style={styles.thumb}>
                        <Image
                            source={require('../img/play.png')}
                            style={styles.play}/>
                    </Image>
                    <View style={styles.itemFooter}>
                        <View style={styles.handleBox}>
                            <Image
                                source={require('../img/heart.png')}
                                style={styles.up}/>
                            <Text style={styles.handleText}>喜欢</Text>
                        </View>
                        <View style={styles.handleBox}>
                            <Image
                                source={require('../img/chat.png')}
                                style={styles.up}/>
                            <Text style={styles.handleText}>评论</Text>
                        </View>
                    </View>
                </View>
            </TouchableHighlight>
        );
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
    item: {
        width: width,
        marginBottom: 10,
        backgroundColor: 'white'
    },
    thumb: {
        width: width,
        height: width * 0.56,
        resizeMode: 'cover',
    },
    title: {
        padding: 10,
        fontSize: 18,
        color: '#333'
    },
    itemFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#eee'
    },
    handleBox: {
        padding: 10,
        flexDirection: 'row',
        width: width / 2 - 0.5,
        justifyContent: 'center',
        backgroundColor: '#fff'
    },
    play: {
        position: 'absolute',
        bottom: 14,
        right: 14,
        width: 40,
        height: 40,
    },

    handleText: {
        paddingLeft: 12,
        fontSize: 18,
        color: '#333',
        alignItems: 'center'
    },

    up: {
        width: 20,
        height: 20
    },

    loadingMore: {
        marginVertical: 20,
    },

    loadingText: {
        color: '#777',
        textAlign: 'center'
    }


});