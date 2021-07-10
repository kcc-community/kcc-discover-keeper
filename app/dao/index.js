/*
* Node Version: V12.3+
* File Name: index
* Auther: Yao
* Date Created: 2021-06-28
*/


const {sequelizer}      = require("./connection/sequelize");
const {EventDaoView}    = require("./view/event");
const {GasPriceDaoView} = require("./view/gasprice");
const {RecordDaoView}   = require("./view/record");


module.exports = {
    sequelizer,

    EventDaoView,
    GasPriceDaoView,
    RecordDaoView,

};
