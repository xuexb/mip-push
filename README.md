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

## todo

- [ ] cli命令
- [ ] 测试覆盖