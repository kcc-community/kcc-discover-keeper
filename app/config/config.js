/*
* Node Version: V12.3+
* File Name: config
* Auther: Yao
* Date Created: 2021-06-28
*/


const path   = require("path");
const config = {
    blockchain:  {
        testnet: true,
    },
    integration: {
        ethGasStation: "http://35.230.71.255:16010",
        ethGasNow:     "http://35.230.71.255:16020",
        ethFullnode:   "http://35.230.71.255:17010",
        kccFullnode:   "http://35.230.71.255:17020",
    },
    gateway:     {
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
    cronjob:     {
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
    mysql:       {
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
