/*
* Node Version: V12.3+
* File Name: config
* Auther: Yao
* Date Created: 2021-06-28
*/


const path   = require("path");
const config = {
    blockchain: {
        testnet: true,
        eth:     {
            mainnet: {
                network:       "mainnet",
                chainId:       1,
                fullnode:      "https://infura.io/v3",
                apiKey:        "80d3beb1a7984234a221e55db17b8cdf",
                confirmations: 6,
                bridgeAddress: "TODO",
            },
            testnet: {
                network:       "rinkeby",
                chainId:       4,
                fullnode:      "https://rinkeby.infura.io/v3",
                apiKey:        "80d3beb1a7984234a221e55db17b8cdf",
                confirmations: 1,
                bridgeAddress: "0x7c017970B36a5c50E1221e3F70f447dFCb931472",
            },
        },
        kcc:     {
            mainnet: {
                network:       "mainnet",
                chainId:       321,
                fullnode:      "https://rpc-mainnet.kcc.network",
                apiKey:        "",
                confirmations: 21,
                bridgeAddress: "TODO",
            },
            testnet: {
                network:           "testnet",
                chainId:           322,
                fullnode:          "https://rpc-testnet.kcc.network",
                apiKey:            "",
                confirmations:     1,
                bridgeAddress:     "0x69b644CE2d0f2c80D02312ef4fD05a1a2aAf3697",
                bridgePairAddress: "0x98186911436588a7243C646F34dfAEf3eEE99418",
            },
        },
    },
    gateway:    {
        name:       "gateway",
        host:       "0.0.0.0",
        port:       8010,
        logDir:     path.join(__dirname, "../../logs/gateway"),
        logLevel:   "info",
        prefix:     "/v1/bridge/keeper",
        pagination: {
            page:  1,
            limit: 100,
        },
    },
    cronjob:    {
        eth_event_synchronizer:     {
            name:     "cronjob-eth-event",
            logDir:   path.join(__dirname, "../../logs/cronjob/eth-event"),
            logLevel: "info",
            schedule: "*/10 * * * * *",
        },
        eth_gas_price_synchronizer: {
            name:     "cronjob-eth-gas-price",
            logDir:   path.join(__dirname, "../../logs/cronjob/eth-gas-price"),
            logLevel: "info",
            schedule: "*/60 * * * * *",
        },
        kcc_event_synchronizer:     {
            name:     "cronjob-kcc-event",
            logDir:   path.join(__dirname, "../../logs/cronjob/kcc-event"),
            logLevel: "info",
            schedule: "*/10 * * * * *",
        },
    },
    mysql:      {
        url:     "mysql://root:root@127.0.0.1:3306/keeper",
        options: {
            pool:      {
                max: 50,
                min: 10,
            },
            define:    {
                timestamps:      false,
                freezeTableName: true,
            },
            timezone:  "+08:00",
            benchmark: true,
        },
        echo:    true,
    },
};


module.exports = config;
