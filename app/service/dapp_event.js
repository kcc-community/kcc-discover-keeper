/*
* Node Version: V12.3+
* File Name: core_event
* Auther: Yao
* Date Created: 2021-06-29
*/


const {cronjob: {discover_kcc_event_synchronizer: __discover__}} = require("../config/config");
const logger                                                     = require("node-common-sdk").logger(__discover__.logDir, __discover__.logLevel, __discover__.name);
const {CronBase}                                                 = require("node-common-sdk/lib/scheduler");
const {AppHook}                                                  = require("../middleware/hook");
const {DiscoverKCCSynchronizerJob}                               = require("../scheduler/event");
const {Scheduler}                                                = require("../lib/scheduler");


process.on("SIGINT", AppHook.onStop);


const synchronizerScheduler = new CronBase(__discover__.name, [DiscoverKCCSynchronizerJob]);
new Scheduler(synchronizerScheduler.cronName, __discover__.schedule, synchronizerScheduler.onUpdate.bind(synchronizerScheduler)).start();


module.exports = {};