/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TabBarIOS,
} from 'react-native';
import List from './src/view/List'
import Edit from './src/view/Edit'
import Account from './src/view/Account'

export default class Main extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedTab: 'list',
            notifCount: 0,
            presses: 0,
        }
    }

    render() {
        return (
            <TabBarIOS
                tintColor="#ee735c">
                <TabBarIOS.Item
                    icon={require('./src/img/video.png')}
                    selected={this.state.selectedTab === 'list'}
                    onPress={() => {
                        this.setState({
                            selectedTab: 'list',
                        });
                    }}>
                    <List/>
                </TabBarIOS.Item>
                <TabBarIOS.Item
                    icon={require('./src/img/recording.png')}
                    selected={this.state.selectedTab === 'edit'}
                    onPress={() => {
                        this.setState({
                            selectedTab: 'edit',
                        });
                    }}>
                    <Edit/>
                </TabBarIOS.Item>
                <TabBarIOS.Item
                    icon={require('./src/img/more.png')}
                    selected={this.state.selectedTab === 'account'}
                    onPress={() => {
                        this.setState({
                            selectedTab: 'account',
                        });
                    }}>
                    <Account/>
                </TabBarIOS.Item>
            </TabBarIOS>
        );
    }
}


const styles = StyleSheet.create({
    tabContent: {
        flex: 1,
        alignItems: 'center',
    },
    tabText: {
        color: 'white',
        margin: 50,
    },
});

AppRegistry.registerComponent('ImoocLearning', () => Main);
