/*
* Node Version: V12.3+
* File Name: config
* Auther: Yao
* Date Created: 2021-06-28
*/


require("dotenv").config();


const path   = require("path");
const config = {
    blockchain:  {
        testnet: process.env.TESTNET,
        step:    1000,
    },
    integration: {
        ethGasStation: process.env.ETH_GAS_STATION,
        ethGasNow:     process.env.ETH_GAS_NOW,
        ethFullnode:   process.env.ETH_FULLNODE,
        kccFullnode:   process.env.KCC_FULLNODE,
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
        eth_event_synchronizer:    {
            name:     "cronjob-eth-event",
            logDir:   path.join(__dirname, "../../logs/cronjob/eth-event"),
            logLevel: "info",
            schedule: "*/60 * * * * *",
        },
        eth_gasprice_synchronizer: {
            name:     "cronjob-eth-gasprice",
            logDir:   path.join(__dirname, "../../logs/cronjob/eth-gasprice"),
            logLevel: "info",
            schedule: "*/60 * * * * *",
        },
        kcc_event_synchronizer:    {
            name:     "cronjob-kcc-event",
            logDir:   path.join(__dirname, "../../logs/cronjob/kcc-event"),
            logLevel: "info",
            schedule: "*/60 * * * * *",
        },
    },
    mysql:       {
        url:     process.env.DATABASE,
        options: {
            pool:      {
                max: 50,
                min: 10,
            },
            define:    {
                timestamps:      false,
                freezeTableName: true,
            },
            timezone:  "+00:00",
            benchmark: true,
        },
        echo:    true,
    },
};


module.exports = config;
