/*
* Node Version: V12.3+
* File Name: index
* Auther: Yao
* Date Created: 2021-06-28
*/


const {gateway: __gateway__} = require("../config/config");
const Router                 = require("koa-router");
const {BlockChainController} = require("./blockchain");
const {HealthController}     = require("./health");
const router                 = new Router({prefix: __gateway__.prefix});


router.get("/heartbeat", HealthController.heartbeat.bind(HealthController));                // 服务心跳检测
router.get("/gasprice", BlockChainController.queryGasPrice.bind(BlockChainController));     // 查询gasPrice
router.get("/event", BlockChainController.queryEventList.bind(BlockChainController));       // 查询事件列表


module.exports = {
    router,
};
