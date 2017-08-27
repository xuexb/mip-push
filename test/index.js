/**
 * @file 测试用例
 * @author xuexb <fe.xiaowu@gmail.com>
 */

import Mip from '../src/';
import {expect} from 'chai';
import sinon from 'sinon';
import request from 'request';

describe('mip-push', () => {
    let spy;

    afterEach(() => {
        if (spy) {
            spy.restore();
            spy = null;
        }
    });

    it('check options', () => {
        expect(() => {
            new Mip();
        }).to.throw(/options.site/);

        expect(() => {
            new Mip({
                token: '1'
            });
        }).to.throw(/options.site/);

        expect(() => {
            new Mip({
                site: '1'
            });
        }).to.throw(/options.token/);

        expect(() => {
            new Mip({
                site: '1',
                token: '1'
            });
        }).to.not.throw();
    });

    it('#_getApi', () => {
        const app = new Mip({
            site: 'mip.xuexb.com',
            token: '123456'
        });

        expect(app._getApi('push')).to.string('site=mip.xuexb.com');
        expect(app._getApi('push')).to.string('token=123456');
    });

    it('#_checkUrl', () => {
        const app = new Mip({
            site: 'mip.xuexb.com',
            token: '123456'
        });

        [
            '',
            1,
            [],
            ['', null]
        ].forEach(val => {
            expect(() => {
                app.push(val);
            }).to.throw('urls is empty');
        });

        expect(() => {
            app.push('url');
        }).to.not.throw();

        expect(() => {
            app.push(['url1', 'url2']);
        }).to.not.throw();
    });

    describe('#_send', () => {
        let app;

        beforeEach(() => {
            app = new Mip({
                site: 'mip.xuexb.com',
                token: 123456
            });
        });

        afterEach(() => {
            if ('function' === typeof request.post.restore) {
                request.post.restore();
            }
        });

        it('server error', done => {
            sinon.stub(request, 'post').yields('error');

            app._send('http://xuexb.com', ['1']).catch(err => {
                expect(err).to.deep.equal({
                    error: -1,
                    message: 'error'
                });

                done();
            });
        });

        it('parse json error', done => {
            sinon.stub(request, 'post').yields(null, '', '{');

            app._send('http://xuexb.com', ['1']).catch(err => {
                expect(err).to.deep.equal({
                    error: -2,
                    message: 'parse json error'
                });

                done();
            });
        });

        it('data error', done => {
            sinon.stub(request, 'post').yields(null, '', JSON.stringify({
                error: 1
            }));

            app._send('http://xuexb.com', ['1']).catch(err => {
                expect(err).to.deep.equal({
                    error: 1,
                    message: 'server code error'
                });

                done();
            });
        });

        it('zhanzhang data error', done => {
            app._send('http://xuexb.com', ['xx']).catch(err => {
                expect(err).to.deep.equal({
                    error: 1,
                    message: 'auth check fail'
                });

                done();
            });
        });
    });

    it('#push', () => {
        const app = new Mip({
            site: 'mip.xuexb.com',
            token: 123456
        });

        spy = sinon.spy(app, '_send');

        app.push('url1');
        app.push('url2');

        expect(spy.calledTwice).to.be.true;
        expect(spy.args[0]).to.deep.equal(['push', ['url1']]);
        expect(spy.args[1]).to.deep.equal(['push', ['url2']]);
    });

    it('#delete', () => {
        const app = new Mip({
            site: 'mip.xuexb.com',
            token: 123456
        });

        spy = sinon.spy(app, '_send');

        app.delete('url1');
        app.delete('url2');

        expect(spy.calledTwice).to.be.true;
        expect(spy.args[0]).to.deep.equal(['delete', ['url1']]);
        expect(spy.args[1]).to.deep.equal(['delete', ['url2']]);
    });

    it('#update', () => {
        const app = new Mip({
            site: 'mip.xuexb.com',
            token: 123456
        });

        spy = sinon.spy(app, '_send');

        app.update('url1');
        app.update('url2');

        expect(spy.calledTwice).to.be.true;
        expect(spy.args[0]).to.deep.equal(['update', ['url1']]);
        expect(spy.args[1]).to.deep.equal(['update', ['url2']]);
    });

    // 真实数据更新
    if (process.env.MIP_TOKEN && process.env.MIP_SITE) {
        it('post zhanzhang.baidu.com', done => {
            new Mip({
                site: process.env.MIP_SITE,
                token: process.env.MIP_TOKEN
            }).update('https://mip.xuexb.com').then(data => {
                expect(data).to.deep.equal({
                    status: 0,
                    msg: 'cache clean success'
                });
                done();
            });
        });
    }
});
