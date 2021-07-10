/*
* Node Version: V12.3+
* File Name: block
* Auther: Yao
* Date Created: 2021-07-09
*/


const {StatusEnum}  = require("node-common-sdk").enums;
const {ViewBase}    = require("node-common-sdk/lib/dao");
const {sequelizer}  = require("../connection/sequelize");
const BlockDaoModel = require("../model/block");


/**
 * View
 */
class BlockDaoView extends ViewBase {
    constructor() {
        super(BlockDaoModel, sequelizer);
    }

    /**
     * @param chain
     * @param status
     * @returns {Promise<void>}
     */
    async queryBlockInfo(chain, status = StatusEnum.ENABLE.value) {
        return await this.findOne({
            chain,
            status,
        });
    }

    /**
     * @param values
     * @param id
     * @returns {Promise<void>}
     */
    async updateBlockInfo(values, id) {
        return await this.update(values, {id});
    }

}


module.exports = {
    BlockDaoView,
};
