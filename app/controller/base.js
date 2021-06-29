/*
* Node Version: V12.3+
* File Name: base
* Auther: Yao
* Date Created: 2021-06-28
*/


const {Success} = require("node-common-sdk").error;


class ControllerBase {
    /**
     * 接口数据流Before
     * @param ctx
     * @returns {Promise<*>}
     */
    static async before(ctx) {
        let body      = ctx.request.body;
        let query     = ctx.request.query;
        let parameter = ctx.state.parameter;

        return {
            parameter,
            query,
            body,
            options: {},
        };
    }

    /**
     * 接口数据流After
     * @param ctx
     * @param response
     * @returns {Promise<void>}
     */
    static async after(ctx, response) {
        ctx.body = new Success().getReturnData(response);
    }

    /**
     * 接口数据流Flow
     * @param ctx
     * @param method
     * @returns {Promise<void>}
     */
    static async flow(ctx, method) {
        await this.after(ctx, await this[method](ctx, await this.before(ctx)));
    }

}


module.exports = {
    ControllerBase,
};
