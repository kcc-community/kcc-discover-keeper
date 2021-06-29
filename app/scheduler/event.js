/*
* Node Version: V12.3+
* File Name: synchronizer
* Auther: Yao
* Date Created: 2021-06-29
*/


const {blockchain: __blockchain__} = require("../config/config");
const logger                       = require("node-common-sdk").logger();
const {JobBase}                    = require("node-common-sdk/lib/scheduler");
const {
          Bridge,
          BridgePair,
      }                            = require("../blockchain/bridge");
const {EventDaoView}               = require("../dao");


class SynchronizerJob extends JobBase {
    constructor(parameter) {
        super(parameter);

        this.handler = null;
        this.event   = new EventDaoView();
    }

    /**
     * 重写父类定义
     * @returns {Promise<void>}
     */
    async execute() {
        const latest = await this.handler.getBlockNumber() - this.confirmations;
        const next   = await this.event.queryMaxBlockNumber(this.handler.chain);
        if (latest < next) {
            logger.info({
                ...this.context,
                message: `chain=${this.handler.chain}||latest=${latest}||next=${next}||confirmations=${this.confirmations}||fullnode block height does not exceed confirmations`,
            });

            return;
        }

        const events = await this.handler.getEventList(next, latest);
        for (let event of events) {
            await this.event.findOrCreate(
                {
                    chain:    event.chain,
                    txHash:   event.txHash,
                    txIndex:  event.txIndex,
                    logIndex: event.logIndex,
                },
                event,
            );
        }

        logger.info({
            ...this.context,
            message: `chain=${this.handler.chain}||latest=${latest}||next=${next}||confirmations=${this.confirmations}||events=${events.length}`,
        });
    }

}


class ETHBridgeSynchronizerJob extends SynchronizerJob {
    constructor(parameter) {
        super(parameter);

        const source       = __blockchain__.testnet ? __blockchain__.eth.testnet : __blockchain__.eth.mainnet;
        const props        = {
            chain:   "eth",
            chainId: source.chainId,
            address: source.bridgeAddress,
            apiKey:  source.apiKey,
        };
        this.confirmations = source.confirmations;
        this.handler       = new Bridge(props);
    }

}


class KCCBridgeSynchronizerJob extends SynchronizerJob {
    constructor(parameter) {
        super(parameter);

        const source       = __blockchain__.testnet ? __blockchain__.kcc.testnet : __blockchain__.kcc.mainnet;
        const props        = {
            chain:   "kcc",
            chainId: source.chainId,
            address: source.bridgeAddress,
            url:     source.fullnode,
        };
        this.confirmations = source.confirmations;
        this.handler       = new Bridge(props);
    }

}


class KCCBridgePairSynchronizerJob extends SynchronizerJob {
    constructor(parameter) {
        super(parameter);

        const source       = __blockchain__.testnet ? __blockchain__.kcc.testnet : __blockchain__.kcc.mainnet;
        const props        = {
            chain:   "kcc",
            chainId: source.chainId,
            address: source.bridgePairAddress,
            url:     source.fullnode,
        };
        this.confirmations = source.confirmations;
        this.handler       = new BridgePair(props);
    }

}


module.exports = {
    ETHBridgeSynchronizerJob,
    KCCBridgeSynchronizerJob,
    KCCBridgePairSynchronizerJob,
};
