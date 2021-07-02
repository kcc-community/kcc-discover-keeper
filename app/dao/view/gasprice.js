/*
* Node Version: V12.3+
* File Name: gas_price
* Auther: Yao
* Date Created: 2021-06-28
*/


const {
          StatusEnum,
          SortEnum,
      }                = require("node-common-sdk").enums;
const {lodash}         = require("node-common-sdk").helper;
const {ViewBase}       = require("node-common-sdk/lib/dao");
const {sequelizer}     = require("../connection/sequelize");
const GasPriceDaoModel = require("../model/gasprice");


class GasPriceDaoView extends ViewBase {
    constructor() {
        super(GasPriceDaoModel, sequelizer);
    }

    /**
     * @param where
     * @param offset
     * @param limit
     * @param status
     * @returns {Promise<void>}
     */
    async queryGasPriceList(where, offset = 0, limit = 100, status = StatusEnum.ENABLE.value) {
        return await this.findAndCountAll({
            where: lodash.extend({status}, where),
            offset,
            order: [["updateTime", SortEnum.DESC.key]],
            limit,
        });
    }
}


module.exports = {
    GasPriceDaoView,
};
