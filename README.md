# mip-push

> 百度站长里推送MIP内容

[![code style fecs](https://img.shields.io/badge/code%20style-fecs-brightgreen.svg)](https://github.com/ecomfe/fecs)
[![Build Status](https://travis-ci.org/xuexb/mip-push.svg?branch=master)](https://travis-ci.org/xuexb/mip-push)
[![Test Coverage](https://img.shields.io/coveralls/xuexb/mip-push/master.svg)](https://coveralls.io/r/xuexb/mip-push)
[![MIT license](https://img.shields.io/github/license/xuexb/mip-push.svg)](https://github.com/xuexb/mip-push)

## 安装

```shell
$ [sudo] npm i mip-push
```

## 使用

```js
var Mip = require('mip-push');
var app = new Mip({
    site: '',
    token: ''
});

// 推送数据
app.push(url);
app.push([
    url1,
    url2,
    url3
]);

// 删除数据
app.delete(url1);

// 更新数据
app.update(url1);
```

## 成功响应

> 参考 [百度站长平台](http://zhanzhang.baidu.com/mip/index)

```js
{
    // 当天剩余的可推送url条数
    remain: 4999998,

    // 成功推送的url条数
    success: 2,

    // 由于不是本站url而未处理的url列表
    not_same_site: [],

    // 不合法的url列表
    not_valid: []
}
```

## 响应错误码

#### 后端服务出错

```js
{
    error: -1,
    message: 具体错误信息 || 'server error'
}
```

#### 后端返回值错误

```js
{
    error: -2,
    message: 'parse json error'
}
```

#### 数据错误

> 参考 [百度站长平台](http://zhanzhang.baidu.com/mip/index)

```js
{
    // 错误码，与状态码相同
    error: 4xx,

    // 错误描述
    msg: 'token is not valid'
}
```

## todo

- [ ] cli命令
- [ ] 测试覆盖