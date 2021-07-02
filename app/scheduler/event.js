/*
* Node Version: V12.3+
* File Name: synchronizer
* Auther: Yao
* Date Created: 2021-06-29
*/


const {blockchain: __blockchain__} = require("../config/config");
const logger                       = require("node-common-sdk").logger();
const {JobBase}                    = require("node-common-sdk/lib/scheduler");
const {Contract}                   = require("kcc-bridge-sdk").contract;
const {EventDaoView}               = require("../dao");


class SynchronizerJob extends JobBase {
    constructor(parameter) {
        super(parameter);

        this.handler = null;
        this.event   = new EventDaoView();
    }

    /**
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


class ETHBridgeCoreSynchronizerJob extends SynchronizerJob {
    constructor(parameter) {
        super(parameter);

        this.handler       = Contract.getBridgeCore("eth", {testnet: __blockchain__.testnet});
        this.confirmations = this.handler.props.confirmations;
    }

}


class KCCBridgeCoreSynchronizerJob extends SynchronizerJob {
    constructor(parameter) {
        super(parameter);

        this.handler       = Contract.getBridgeCore("kcc", {testnet: __blockchain__.testnet});
        this.confirmations = this.handler.props.confirmations;
    }

}


class KCCBridgePairSynchronizerJob extends SynchronizerJob {
    constructor(parameter) {
        super(parameter);

        this.handler       = Contract.getBridgePair("kcc", {testnet: __blockchain__.testnet});
        this.confirmations = this.handler.props.confirmations;
    }

}


module.exports = {
    ETHBridgeCoreSynchronizerJob,
    KCCBridgeCoreSynchronizerJob,
    KCCBridgePairSynchronizerJob,
};
