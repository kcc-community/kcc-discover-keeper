/*
* Node Version: V12.3+
* File Name: blockchain
* Auther: Yao
* Date Created: 2021-06-28
*/

const {lodash}               = require("node-common-sdk").helper;
const {BusinessItemNotFound} = require("node-common-sdk").error;
const {
          GasPriceDaoView,
          EventDaoView,
      }                      = require("../dao");
const {BlockApiView}         = require("../view/blockchain");


class BlockChainApiModel {
    static async queryGasPrice(request) {
        const result = await new GasPriceDaoView().queryGasPriceList(
            {
                chain: request.query.chain.toLowerCase(),
            });

        if (result.count === 0) {
            throw new BusinessItemNotFound(`chain=${request.query.chain}`);
        }

        return BlockApiView.queryGasPrice(request, lodash.head(result.rows));
    }

    static async queryEventList(request) {
        const dao   = new EventDaoView();
        const where = {
            id: {
                [dao.Op.gt]: request.query.id,
            },
        };
        if (request.query.chain) {
            where.chain = request.query.chain.toLowerCase();
        }

        const result = await dao.queryEventList(
            where,
            (request.query.page - 1) * request.query.limit,
            request.query.limit,
        );

        return BlockApiView.queryEventList(request, result);
    }

}


module.exports = {
    BlockChainApiModel,
};
