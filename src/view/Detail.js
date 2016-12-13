/**
 * Created by leibown on 2016/12/13.
 */
/**
 * Created by leibown on 2016/12/11.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Dimensions
} from 'react-native';

import Video from 'react-native-video';
const width = Dimensions.get('window').width;


export default class Detail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: this.props.data,
            rate: 1,
            muted: false,
            resizeMode: 'contain',
            repeat: false
        };
    }

    _backToList = () => {
        this.props.navigator.pop();
    };

    _onLoadStart = () => {
        console.log('load start');
    };

    _onLoad = () => {
        console.log('loads');
    };

    _onProgress = (data) => {
        console.log('onProgress');
        console.log(data);
    };

    _onEnd = () => {
        console.log('_onEnd');
    };

    _onError = (e) => {
        console.log(e);
        console.log('onError');
    };

    render() {
        let data = this.props.data;
        console.log('进来了');
        console.log(data);
        return (
            <View style={styles.container}>
                <Text onPress={this._backToList}>详情界面{data._id}</Text>
                <View style={styles.videoBox}>
                    <Video
                        ref="videoPlayer"
                        source={{uri: data.video}}
                        style={styles.video}
                        volume={5}
                        paused={false}
                        rate={this.state.rate}
                        muted={this.state.muted}
                        resizeMode={this.state.resizeMode}
                        repeat={this.state.repeat}

                        onLoadStart={this._onLoadStart}
                        onLoad={this._onLoad}
                        onProgress={this._onProgress}
                        onEnd={this._onEnd}
                        onError={this._onError}
                    />
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    videoBox: {
        width: width,
        backgroundColor: 'black',
    },
    video: {
        width: width,
        height: 360,
        backgroundColor: 'black'
    }

});