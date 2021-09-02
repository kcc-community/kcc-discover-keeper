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
     * event
     * @param ctx
     * @returns {Promise<void>}
     */
    static async queryEventList(ctx) {
        let request         = await this.before(ctx);
        request.query.id    = lodash.isUndefined(request.query.id) ? 0 : parseInt(request.query.id);
        request.query.page  = lodash.isUndefined(request.query.page) ? __gateway__.pagination.page : parseInt(request.query.page);
        request.query.limit = lodash.isUndefined(request.query.limit) ? __gateway__.pagination.limit : parseInt(request.query.limit);
        if (request.query.logIndex) {
            request.query.logIndex = parseInt(request.query.logIndex);
        }
        schema.validate("QueryEventList", request.query);

        let response = await BlockChainApiModel.queryEventList(request);

        await this.after(ctx, response);
    }

}


module.exports = {
    BlockChainController,
};
