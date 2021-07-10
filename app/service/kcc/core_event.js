/*
* Node Version: V12.3+
* File Name: core_event
* Auther: Yao
* Date Created: 2021-06-29
*/


const {cronjob: __cronjob__}         = require("../../config/config");
const logger                         = require("node-common-sdk").logger(__cronjob__.kcc_core_event_synchronizer.logDir, __cronjob__.kcc_core_event_synchronizer.logLevel, __cronjob__.kcc_core_event_synchronizer.name);
const {CronJob}                      = require("cron");
const {CronBase}                     = require("node-common-sdk/lib/scheduler");
const {AppHook}                      = require("../../middleware/hook");
const {KCCBridgeCoreSynchronizerJob} = require("../../scheduler/event");


process.on("SIGINT", AppHook.onStop);


const synchronizerScheduler = new CronBase(__cronjob__.kcc_core_event_synchronizer.name, [KCCBridgeCoreSynchronizerJob]);
new CronJob(__cronjob__.kcc_core_event_synchronizer.schedule, synchronizerScheduler.onUpdate.bind(synchronizerScheduler)).start();


module.exports = {};