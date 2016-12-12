/**
 * Created by leibown on 2016/12/12.
 */

import queryString from 'query-string';
import _ from 'lodash';
import Mock from 'mockjs';


const config = require('./config');
export default class request {

    static get = (url, params) => {
        if (params) {
            url += '?' + queryString.stringify(params);
        }

        return fetch(url)
            .then((response) => response.json())
            .then((responseJson) => Mock.mock(responseJson))
    };


    static post = (url, body) => {
        let options = _.extend(config.header, {
            body: JSON.stringify(body)
        });

        return fetch(url, options)
            .then((response) => response.json())
            .then((responseJson) => Mock.mock(responseJson))
    };

}
