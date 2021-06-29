# 背景介绍
```javascript
    工程主要包含cold-wallet-server一个进程。
```

## 主要目录
```javascript
➜  cold-wallet-server git: ✗ tree -L 2
.
├── README.md
├── app
│   ├── common
│   ├── config
│   ├── controller
│   ├── dao
│   ├── doc
│   ├── middleware
│   ├── model
│   ├── schema
│   ├── sdk
│   ├── service
│   ├── sql
│   ├── test
│   ├── tool
│   └── view
├── data
│   ├── dpa
│   └── ida
├── dist
│   ├── favicon.ico
│   ├── index.html
│   └── static
├── jenkinsenv
├── logs
│   ├── gateway
│   ├── pm2
│   └── signature
├── package-lock.json
├── package.json
├── packages
│   ├── hosts
│   ├── nginx.conf
│   ├── node-blockchain-1.0.0.tgz
│   └── node-common-1.0.0.tgz
└── start.config.js

21 directories, 7 files
```

## 基础指南
```javascript
// 下载代码
git clone http://code.corp.kofo.io/luochuan1/cold-wallet-server.git

// 执行安装
npm install --production

// 启动服务
pm2 start start.config.js
┌────────────────────┬────┬─────────┬──────┬──────┬────────┬─────────┬────────┬─────┬───────────┬───────┬──────────┐
│ App name           │ id │ version │ mode │ pid  │ status │ restart │ uptime │ cpu │ mem       │  user │ watching │
├────────────────────┼────┼─────────┼──────┼──────┼────────┼─────────┼────────┼─────┼───────────┼───────┼──────────┤
│ cold-wallet-server │ 0  │ 1.1.0   │ fork │ 5896 │ online │ 0       │ 0s     │ 0%  │ 15.4 MB   │ admin │ disabled │
└────────────────────┴────┴─────────┴──────┴──────┴────────┴─────────┴────────┴─────┴───────────┴───────┴──────────┘
 Use `pm2 show <id|name>` to get more details about an app
```

# 发布版本记录
## [1.1.0]2019-11-18
1. 支持多channel交易接入。

## [1.0.0]2019-11-13
1. 初步实现cold-wallet-server整体结构；
2. 支持eth/erc20/btc/usdt币种接入。