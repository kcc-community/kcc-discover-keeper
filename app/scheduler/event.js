/*
* Node Version: V12.3+
* File Name: synchronizer
* Auther: Yao
* Date Created: 2021-06-29
*/


const {
          blockchain:  __blockchain__,
          integration: __integration__,
      }          = require("../config/config");
const logger     = require("node-common-sdk").logger();
const {Datetime} = require("node-common-sdk").util;
const {JobBase}  = require("node-common-sdk/lib/scheduler");
const {Contract} = require("kcc-bridge-sdk").contract;
const {
          BlockDaoView,
          EventDaoView,
      }          = require("../dao");
const {
          MonitorBlockNumberBehind5Minutes,
          MonitorEventWithFailedReceiptStatus,
      }          = require("../common/monitor");


class SynchronizerJob extends JobBase {
    static SECONDS = 5 * 60;
    static ETH     = "eth";
    static KCC     = "kcc";

    constructor(parameter) {
        super(parameter);

        this.handler = null;
        this.block   = new BlockDaoView();
        this.event   = new EventDaoView();
    }

    async execute() {
        const block = await this.block.queryBlockInfo(this.handler.chain);
        if (!!!block) {
            logger.info({
                ...this.context,
                message: `chain=${this.handler.chain}||can't find block info`,
            });
            return;
        }
        if (Datetime.fromString1(block.updateTime).seconds < (Datetime.fromNow().seconds - SynchronizerJob.SECONDS)) {
            logger.monitor(new MonitorBlockNumberBehind5Minutes().toString(`${block.updateTime}||${block.keeperBlockNumber}||${block.latestBlockNumber}`));
        }

        const latest = await this.handler.getBlockNumber();
        const upper  = latest - this.confirmations;
        const lower  = block.keeperBlockNumber;
        for (let i = lower; i < upper; i += block.steps) {
            let j = i + block.steps;
            if (j > upper) {
                j = upper;
            }
            await this.runnable(i, j);
            await this.block.updateBlockInfo({
                keeperBlockNumber: upper,
                latestBlockNumber: latest,
            }, block.id);
        }

        logger.info({
            ...this.context,
            message: `chain=${this.handler.chain}||lower=${lower}||upper=${upper}||confirmations=${this.confirmations}`,
        });
    }

    async runnable(fromBlock, toBlock) {
        logger.info({
            ...this.context,
            message: `fromBlock=${fromBlock}||toBlock=${toBlock}`,
        });

        const events = await this.handler.getEventList(fromBlock, toBlock);
        for (let event of events) {
            const receipt = await this.handler.getTransactionReceipt(event.txHash);
            if (!!receipt && receipt.status === 1) {
                await this.event.findOrCreate(
                    {
                        chain:    event.chain,
                        txHash:   event.txHash,
                        txIndex:  event.txIndex,
                        logIndex: event.logIndex,
                    },
                    event,
                );
            } else {
                logger.monitor(new MonitorEventWithFailedReceiptStatus().toString(`${event.chain}||${event.txHash}||${event.logIndex}||${receipt && receipt.status}`));
            }
        }
    }

}


class ETHBridgeCoreSynchronizerJob extends SynchronizerJob {
    constructor(parameter) {
        super(parameter);

        this.handler       = Contract.getBridgeCore(SynchronizerJob.ETH,
            {
                testnet:  __blockchain__.testnet,
                fullnode: __integration__.ethFullnode,
            });
        this.confirmations = this.handler.props.confirmations;
    }

}


class KCCBridgeCoreSynchronizerJob extends SynchronizerJob {
    constructor(parameter) {
        super(parameter);

        this.handler       = Contract.getBridgeCore(SynchronizerJob.KCC,
            {
                testnet:  __blockchain__.testnet,
                fullnode: __integration__.kccFullnode,
            });
        this.confirmations = this.handler.props.confirmations;
    }

}


class KCCBridgePairSynchronizerJob extends SynchronizerJob {
    constructor(parameter) {
        super(parameter);

        this.handler       = Contract.getBridgePair(SynchronizerJob.KCC, {
            testnet:  __blockchain__.testnet,
            fullnode: __integration__.kccFullnode,
        });
        this.confirmations = this.handler.props.confirmations;
    }

}


module.exports = {
    ETHBridgeCoreSynchronizerJob,
    KCCBridgeCoreSynchronizerJob,
    KCCBridgePairSynchronizerJob,
};
