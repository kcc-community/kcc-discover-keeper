/*
* Node Version: V12.3+
* File Name: gas_price_synchronizer
* Auther: Yao
* Date Created: 2021-06-29
*/


const assert            = require("assert");
const Ethers            = require("ethers");
const logger            = require("node-common-sdk").logger();
const {JobBase}         = require("node-common-sdk/lib/scheduler");
const {HttpConnection}  = require("node-common-sdk/lib/connection/http");
const {GasPriceDaoView} = require("../dao");


class SynchronizerJob extends JobBase {
    constructor(parameter) {
        super(parameter);

        this.chain    = "";
        this.source   = "";
        this.url      = "";
        this.gasPrice = new GasPriceDaoView();
    }

    async getGasPrice() {
        return {};
    }

    /**
     * 重写父类定义
     * @returns {Promise<void>}
     */
    async execute() {
        const data           = await this.getGasPrice();
        const [row, created] = await this.gasPrice.findOrCreate(
            {
                chain:  data.chain,
                source: data.source,
            },
            data);
        if (!created) {
            row.fastest = data.fastest;
            row.fast    = data.fast;
            await row.save();
        }

        logger.info({
            ...this.context,
            message: `chain=${this.chain}||source=${this.source}||fastest=${data.fastest}||fast=${data.fast}`,
        });
    }

}


class ETHGasStationSynchronizerJob extends SynchronizerJob {
    constructor(parameter) {
        super(parameter);

        this.chain  = "eth";
        this.source = "ethgasstation";
        this.url    = "https://ethgasstation.info/api/ethgasAPI.json";
    }

    async getGasPrice() {
        const result = await HttpConnection.get(this.parameter, this.url);

        return {
            "chain":   this.chain,
            "fastest": Ethers.BigNumber.from(result.fastest).div(10).toString(),
            "fast":    Ethers.BigNumber.from(result.fast).div(10).toString(),
            "source":  this.source,
        };
    }

}


class ETHGasNowSynchronizerJob extends SynchronizerJob {
    constructor(parameter) {
        super(parameter);

        this.chain  = "eth";
        this.source = "gasnow";
        this.url    = "https://www.gasnow.org/api/v3/gas/price?utm_source=bridge-keeper";
    }

    async getGasPrice() {
        const result = await HttpConnection.get(this.parameter, this.url);
        assert(result.code === 200, "invalid response code");

        return {
            "chain":   this.chain,
            "fastest": Ethers.BigNumber.from(result.data.rapid).div(1000000000).toString(),
            "fast":    Ethers.BigNumber.from(result.data.fast).div(1000000000).toString(),
            "source":  this.source,
        };
    }

}


module.exports = {
    ETHGasStationSynchronizerJob,
    ETHGasNowSynchronizerJob,
};
