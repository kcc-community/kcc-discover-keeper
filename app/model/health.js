/*
* Node Version: V12.3+
* File Name: health
* Auther: Yao
* Date Created: 2021-06-28
*/


const {HealthApiView} = require("../view/health");


class HealthApiModel {
    static async heartbeat(request) {
        return HealthApiView.heartbeat(request);
    }

}


module.exports = {
    HealthApiModel,
};
