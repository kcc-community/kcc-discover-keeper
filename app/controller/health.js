/*
* Node Version: V12.3+
* File Name: heart
* Auther: Yao
* Date Created: 2021-06-28
*/


const {HealthApiModel} = require("../model");
const {ControllerBase} = require("./base");


class HealthController extends ControllerBase {
    /**
     * heartbeat
     * @param ctx
     * @returns {Promise<void>}
     */
    static async heartbeat(ctx) {
        let request  = await this.before(ctx);
        let response = await HealthApiModel.heartbeat(request);
        await this.after(ctx, response);
    }

}


module.exports = {
    HealthController,
};
