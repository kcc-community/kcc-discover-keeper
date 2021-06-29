/*
* Node Version: V12.3+
* File Name: sequelize
* Auther: Yao
* Date Created: 2019-05-30
*/


const {mysql: __mysql__} = require("../../config/config");
const {SequelizeHandler} = require("node-common-sdk/lib/dao");
const sequelizer         = new SequelizeHandler(__mysql__.url, __mysql__.options, __mysql__.echo);


module.exports = {
    sequelizer,
};
