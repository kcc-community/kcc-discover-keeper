/*
* Node Version: V12.3+
* File Name: monitor
* Auther: Yao
* Date Created: 2021-07-09
*/


const {MonitorBase} = require("node-common-sdk").monitor;
const APPLICATION   = "BRIDGE-KEEPER";


class MonitorBlockNumberBehind5Minutes extends MonitorBase {
    constructor() {
        super(APPLICATION);
    }

}

class MonitorEventWithFailedReceiptStatus extends MonitorBase {
    constructor() {
        super(APPLICATION);
    }

}


module.exports = {
    MonitorBlockNumberBehind5Minutes,
    MonitorEventWithFailedReceiptStatus,
};
