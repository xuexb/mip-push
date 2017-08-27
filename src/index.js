/**
 * @file mip站长推送和更新
 * @author xuexb <fe.xiaowu@gmail.com>
 */

import request from 'request';

export default class Mip {
    static apiUrlMap = {
        push: 'http://data.zz.baidu.com/urls'
        // 'delete': 'http://data.zz.baidu.com/del',
        // 'update': 'http://data.zz.baidu.com/update'
    }

    constructor(options = {}) {
        if (!options.site) {
            throw new TypeError('options.site is empty');
        }

        if (!options.token) {
            throw new TypeError('options.token is empty');
        }

        this.options = options;
    }

    /**
     * 获取api地址
     *
     * @param  {string} action 类型, 有push,delete,update
     *
     * @return {string}
     */
    _getApi(action) {
        return `${Mip.apiUrlMap[action]}?site=${this.options.site}&token=${this.options.token}&type=mip`;
    }

    /**
     * 请求
     *
     * @param  {string} action 类型, 有push,delete,update
     * @param  {Array} urls   链接
     *
     * @return {Promise}
     */
    _send(action, urls) {
        return new Promise((resolve, reject) => {
            request.post({
                uri: this._getApi(action),
                multipart: [{
                    'content-type': 'text/plain',
                    'body': urls.join('\n')
                }]
            }, function (error, response, body) {
                if (error) {
                    return reject({
                        error: -1,
                        message: error
                    });
                }

                try {
                    body = JSON.parse(body);
                }
                catch (e) {
                    body = {
                        error: -2,
                        message: 'parse json error'
                    };
                }

                // 如果有错误
                if (body.error) {
                    return reject({
                        error: body.error,
                        message: body.message || 'server code error'
                    });
                }

                resolve(body);
            });
        });
    }

    /**
     * 检查链接是否规范
     *
     * @private
     * @param  {string|Array} urls 链接
     *
     * @return {Array}
     */
    _checkUrl(urls) {
        if (!Array.isArray(urls)) {
            urls = [urls];
        }

        urls = urls.filter(key => typeof key === 'string' && !!key);

        if (!urls.length) {
            throw new TypeError('urls is empty');
        }

        return urls;
    }

    /**
     * 推送链接
     *
     * @param  {string|Array} urls 链接
     *
     * @return {Promise}
     */
    push(urls) {
        return this._send('push', this._checkUrl(urls));
    }

    /**
     * 删除链接
     *
     * @param  {string|Array} urls 链接
     *
     * @return {Promise}
     */
    // delete(urls) {
    //     return this._send('delete', this._checkUrl(urls));
    // }

    /**
     * 更新链接
     *
     * @param  {string|Array} urls 链接
     *
     * @return {Promise}
     */
    // update(urls) {
    //     return this._send('update', this._checkUrl(urls));
    // }
}
