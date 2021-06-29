/*
* Node Version: V12.3+
* File Name: bridge
* Auther: Yao
* Date Created: 2021-06-29
*/


const abiOfBridge              = require("./abi/Bridge.json");
const abiOfBridgePair          = require("./abi/BridgePair.json");
const Ethers                   = require("ethers");
const {CommonInvalidParameter} = require("node-common-sdk").error;


class Provider {
    constructor(props = {}) {
        this.chain    = props.chain;
        this.chainId  = props.chainId;
        this.address  = props.address;
        this.url      = props.url;
        this.apiKey   = props.apiKey;
        this.contract = {};
        this.filters  = {};

        if (this.apiKey) {
            this.provider = new Ethers.providers.InfuraProvider(this.chainId, this.apiKey);
        } else if (this.url) {
            this.provider = new Ethers.providers.JsonRpcProvider(this.url, this.chainId);
        } else {
            throw new CommonInvalidParameter("url or api key");
        }
    }

    async getBlockNumber() {
        return this.provider.getBlockNumber();
    }

    async getEventList(fromBlock, toBlock = "latest") {
        const result = [];

        const events = await this.contract.queryFilter(this.filters, fromBlock, toBlock);
        for (let event of events) {
            result.push(this.toEvent(event));
        }

        return result;
    }

    toEvent(event) {
        let result = {
            chain:       this.chain,
            address:     this.address,
            blockHash:   event.blockHash,
            blockNumber: event.blockNumber,
            txHash:      event.transactionHash,
            txIndex:     event.transactionIndex,
            logIndex:    event.logIndex,
            event:       event.event,
            args:        {},
        };

        for (let [key, value] of Object.entries(event.args)) {
            result.args[key] = Ethers.BigNumber.isBigNumber(value) ? value.toString() : value;
        }

        return result;
    }

}


class Bridge extends Provider {
    constructor(props = {}) {
        super(props);

        this.contract = new Ethers.Contract(this.address, abiOfBridge, this.provider);
        this.filters  = [
            this.contract.filters.Paused(),
            this.contract.filters.Unpaused(),
            this.contract.filters.AdminChanged(),
            this.contract.filters.AdminRequiredNumChanged(),
            this.contract.filters.AdminTaskDropped(),
            this.contract.filters.FeeToTransferred(),
            this.contract.filters.SwapFeeChanged(),
            this.contract.filters.DepositNative(),
            this.contract.filters.DepositToken(),
            this.contract.filters.WithdrawingNative(),
            this.contract.filters.WithdrawDoneNative(),
            this.contract.filters.WithdrawingToken(),
            this.contract.filters.WithdrawDoneToken(),
        ];
    }

}


class BridgePair extends Provider {
    constructor(props = {}) {
        super(props);

        this.contract = new Ethers.Contract(this.address, abiOfBridgePair, this.provider);
        this.filters  = [
            this.contract.filters.CreatedCoin(),
            this.contract.filters.CreatedPair(),
            this.contract.filters.UpdatedPair(),
        ];
    }

}


module.exports = {
    Bridge,
    BridgePair,
};
