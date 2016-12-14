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
    ActivityIndicator,
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
            repeat: false,
            videoLoaded: false,

            videoTotal: 0,
            currentTime: 0,
            videoProgress: 0.01
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
        if (!this.state.videoLoaded) {
            console.log('执行咯~~~~');
            this.setState({
                videoLoaded: true
            });
        }

        let duration = data.seekableDuration;
        let currentTime = data.currentTime;
        let percent = Number((currentTime / duration).toFixed(2));

        this.setState({
            videoTotal: duration,
            currentTime: Number(currentTime.toFixed(2)),
            videoProgress: percent
        });
    };

    _onEnd = () => {
        this.setState({
            videoProgress: 1
        });
    };

    _onError = (e) => {
        console.log(e);
        console.log('onError');
    };

    render() {
        let data = this.props.data;
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
                        onError={this._onError}
                        onEnd={this._onEnd}
                    />
                    {
                        !this.state.videoLoaded &&
                        <ActivityIndicator color="#ee735c"
                                           style={styles.loading}/>
                    }
                    <View style={styles.progressBox}>
                        <View style={[styles.progressBar,
                            {width: width * this.state.videoProgress}]}/>
                    </View>
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
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
    },

    loading: {
        position: 'absolute',
        left: 0,
        top: 180,
        width: width,
        alignSelf: 'center',
        backgroundColor: 'transparent'
    },
    progressBox: {
        width: width,
        height: 2,
        backgroundColor: 'gray',
    },
    progressBar: {
        width: 1,
        height: 2,
        backgroundColor: '#ee735c'
    },

});