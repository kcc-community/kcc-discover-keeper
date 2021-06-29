/*
* Node Version: V12.3+
* File Name: event
* Auther: Yao
* Date Created: 2021-06-28
*/


const {
          StatusEnum,
          SortEnum,
      }             = require("node-common-sdk").enums;
const {lodash}      = require("node-common-sdk").helper;
const {ViewBase}    = require("node-common-sdk/lib/dao");
const {sequelizer}  = require("../connection/sequelize");
const EventDaoModel = require("../model/event");


/**
 * 事件信息View
 */
class EventDaoView extends ViewBase {
    constructor() {
        super(EventDaoModel, sequelizer);
    }

    /**
     * 查询当前链开始同步的高度
     * @param chain
     * @param status
     * @returns {Promise<number>}
     */
    async queryMaxBlockNumber(chain, status = StatusEnum.ENABLE.value) {
        const result = await this.max("blockNumber", {
            chain,
            status,
        });

        if (lodash.isNaN(result) || lodash.isNull(result) || lodash.isUndefined(result)) {
            return 0;
        }

        return result + 1;
    }

    /**
     * 查询当前分页事件信息
     * @param where
     * @param offset
     * @param limit
     * @param status
     * @returns {Promise<void>}
     */
    async queryEventList(where, offset, limit, status = StatusEnum.ENABLE.value) {
        return await this.findAndCountAll({
            where: lodash.extend({status}, where),
            offset,
            order: [["id", SortEnum.ASC.key]],
            limit,
        });
    }
}


module.exports = {
    EventDaoView,
};
