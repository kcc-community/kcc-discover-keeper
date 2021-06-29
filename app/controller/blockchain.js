/*
* Node Version: V12.3+
* File Name: blockchain
* Auther: Yao
* Date Created: 2021-06-28
*/


const {gateway: __gateway__} = require("../config/config");
const {lodash}               = require("node-common-sdk").helper;
const schema                 = require("node-common-sdk").validator();
const {BlockChainApiModel}   = require("../model");
const {ControllerBase}       = require("./base");


class BlockChainController extends ControllerBase {
    /**
     * 区块链相关：查询gasPrice
     * @param ctx
     * @returns {Promise<void>}
     */
    static async queryGasPrice(ctx) {
        let request = await this.before(ctx);
        schema.validate("QueryGasPrice", request.query);

        let response = await BlockChainApiModel.queryGasPrice(request);

        await this.after(ctx, response);
    }

    /**
     * 区块链相关：查询事件列表
     * @param ctx
     * @returns {Promise<void>}
     */
    static async queryEventList(ctx) {
        let request         = await this.before(ctx);
        request.query.id    = lodash.isUndefined(request.query.id) ? 0 : parseInt(request.query.id);
        request.query.page  = lodash.isUndefined(request.query.page) ? __gateway__.pagination.page : parseInt(request.query.page);
        request.query.limit = lodash.isUndefined(request.query.limit) ? __gateway__.pagination.limit : parseInt(request.query.limit);
        schema.validate("QueryEventList", request.query);

        let response = await BlockChainApiModel.queryEventList(request);

        await this.after(ctx, response);
    }

}


module.exports = {
    BlockChainController,
};
