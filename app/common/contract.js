/*
* Node Version: V12.3+
* File Name: contract
* Author: neo
* Date Created: 2021-08-13
*/

const {Provider}     = require("kcc-bridge-sdk-bsc/lib/contract/provider");
const DiscoverKccAbi = require("../abi/discover.json");
const Ethers         = require("ethers");
const config         = require("kcc-bridge-sdk-bsc/lib/config/config");
const KeeperConfig   = require("../config/config");
const lodash         = require("lodash");


class KeeperProvider extends Provider {
    async getEventList(fromBlock, toBlock = "latest") {
        const result = [];

        const events = await this.contract.queryFilter(this.filters, fromBlock, toBlock);
        for (let event of events) {
            if (!!event.args) {
                result.push(this.toEvent(event));
            }
        }

        return result;
    }

    toEvent(event) {
        return {
            chain:       this.chain,
            address:     this.address,
            blockHash:   event.blockHash,
            blockNumber: event.blockNumber,
            txHash:      event.transactionHash,
            txIndex:     event.transactionIndex,
            logIndex:    event.logIndex,
            event:       event.event,
            args:        {...this.format(event.args)},
        };
    }

    format(params) {
        if (!lodash.isArray(params)) {
            return Ethers.BigNumber.isBigNumber(params) ? params.toString() : params;
        }
        let ret = [];
        for (let [k, v] of Object.entries(params)) {
            ret[k] = this.format(v);
        }
        return ret;
    }
}

class DiscoverKCC extends KeeperProvider {
    constructor(props = {}) {
        super(props);
        this.address  = props.address;
        this.abi      = DiscoverKccAbi;
        this.contract = new Ethers.Contract(this.address, this.abi, this.provider);
        this.filters  = [
            this.contract.filters.AddPrimaryCategory(),
            this.contract.filters.UpdatePrimaryCategory(),
            this.contract.filters.AddSecondaryCategory(),
            this.contract.filters.UpdateSecondaryCategory(),
            this.contract.filters.SubmitProjectInfo(),
            this.contract.filters.VerifySubmitProjectInfo(),
            this.contract.filters.UpdateProjectInfo(),
            this.contract.filters.VerifyUpdateProjectInfo(),
            this.contract.filters.SubmitCommentInfo(),
            this.contract.filters.IsLikeCommentInfo(),
            this.contract.filters.DeleteComment(),
        ];
    }
}

class Contract {
    static getBridgeCore(chain, props = {}) {
        const network = props.testnet ? config[chain].testnet : config[chain].mainnet;
        const source  = lodash.extend(network, props);

        return new DiscoverKCC(lodash.extend(source, {
            chain,
            address: KeeperConfig.dAppAddress,
        }));
    }
}


module.exports = {
    Contract,
};
