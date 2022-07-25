/*
* Node Version: V12.3+
* File Name: config
* Auther: Yao
* Date Created: 2021-06-28
*/


const path = require("path");
require("dotenv").config({path: path.join(__dirname, "../../.env")});

const config = {
    project:     "kcc-discover-keeper",
    blockchain:  {
        testnet: process.env.TESTNET === "true",
    },
    dAppAddress: process.env.DAPP_ADDRESS,
    integration: {
        kccFullnode: process.env.KCC_FULLNODE,
    },
    gateway:     {
        name:       "gateway",
        host:       "0.0.0.0",
        port:       process.env.PORT,
        logDir:     path.join(__dirname, "../../logs/gateway"),
        logLevel:   "info",
        prefix:     "/v1/discover/keeper",
        pagination: {
            page:  1,
            limit: 100,
        },
    },
    cronjob:     {
        discover_kcc_event_synchronizer: {
            name:     "cronjob-discover-kcc-event",
            logDir:   path.join(__dirname, "../../logs/cronjob/discover-kcc-event"),
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
        echo:    false,
    },
    redis: process.env.REDIS
};


module.exports = config;
