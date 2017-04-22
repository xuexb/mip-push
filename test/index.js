/**
 * @file 测试用例
 * @author xuexb <fe.xiaowu@gmail.com>
 */

import Mip from '../src/';
import {expect} from 'chai';
import sinon from 'sinon';

describe('mip-push', () => {
    let server;
    let spy;

    afterEach(() => {
        if (server) {
            server.restore();
            server = null;
        }

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

    // it('#_send error1', done => {
    //     const app = new Mip({
    //         site: 'mip.xuexb.com',
    //         token: 123456
    //     });

    //     server = sinon.fakeServer.create();
    //     server.respondWith(Mip.apiUrlMap.push,
    //         [200, {
    //             'Content-Type': 'text/plain'
    //         }, 'test']);

    //     app.push('xuexb.com').then(a => {
    //         console.log(a);
    //         done();
    //     }, b => {
    //         console.log(b);
    //     });
    // });

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
});
