/**
 * Created by leibown on 2016/12/13.
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TouchableHighlight,
    Image,
    Dimensions,
    AlertIOS
} from 'react-native';
import config from '../common/config';
import request from '../common/request';

const width = Dimensions.get('window').width;
export default class Item extends Component {

    constructor(props) {
        super(props);
        this.state = {
            up: false
        };
    }

    _up = () => {
        let up = !this.state.up;
        let row = this.props.row;
        let url = config.api.base + config.api.up;

        let body = {
            id: row._id,
            up: up ? 'yes' : 'no',
            accessToken: 'cacsa'
        };

        request.post(url, body)
            .then((data) => {
                if (data && data.success) {
                    this.setState({
                        up: up,
                    })
                } else {
                    AlertIOS.alert('点赞失败，稍后重试');
                }
            })
            .catch((error) => {
                console.log(error);
                AlertIOS.alert('点赞失败，稍后重试');
            });
    };

    render() {
        return (
            <TouchableOpacity onPress={this.props.onSelect}>
                <View style={styles.item}>
                    <Text style={styles.title}>{this.props.row.title}</Text>
                    <Image source={{uri: this.props.row.thumb}} style={styles.thumb}>
                        <Image
                            source={require('../img/play.png')}
                            style={styles.play}/>
                    </Image>
                    <View style={styles.itemFooter}>
                        <TouchableOpacity onPress={this._up}>
                            <View style={styles.handleBox}>
                                <Image
                                    source={this.state.up ? require('../img/ic_liked.png') : require('../img/heart.png')}
                                    style={styles.up}/>
                                <Text style={styles.handleText}>喜欢</Text>
                            </View>
                        </TouchableOpacity>
                        <View style={styles.handleBox}>
                            <Image
                                source={require('../img/chat.png')}
                                style={styles.up}/>
                            <Text style={styles.handleText}>评论</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        );
    };
}

const styles = StyleSheet.create({
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