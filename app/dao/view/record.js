/*
* Node Version: V12.3+
* File Name: record
* Auther: Yao
* Date Created: 2021-07-09
*/


const {StatusEnum}   = require("node-common-sdk").enums;
const {ViewBase}     = require("node-common-sdk/lib/dao");
const {sequelizer}   = require("../connection/sequelize");
const RecordDaoModel = require("../model/record");


/**
 * View
 */
class RecordDaoView extends ViewBase {
    constructor() {
        super(RecordDaoModel, sequelizer);
    }

    /**
     * @param chain
     * @param event
     * @param status
     * @returns {Promise<void>}
     */
    async queryRecord(chain, event, status = StatusEnum.ENABLE.value) {
        return await this.findOne({
            chain,
            event,
            status,
        });
    }

    /**
     * @param values
     * @param id
     * @returns {Promise<void>}
     */
    async updateRecord(values, id) {
        return await this.update(values, {id});
    }

}


module.exports = {
    RecordDaoView,
};
