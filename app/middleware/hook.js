/*
* Node Version: V12.3+
* File Name: hook
* Auther: Yao
* Date Created: 2021-06-28
*/


const {KoaHook}    = require("node-common-sdk/lib/middleware");
const {sequelizer} = require("../dao");


class AppHook extends KoaHook {
    static async onStop() {
        let flag = 1;
        try {
            await sequelizer.handler.close();
            flag = 0;
        } catch (error) {
            AppHook.onError(error, AppHook.onStop.name);
        } finally {
            process.exit(flag);
        }
    }
}


module.exports = {
    AppHook,
};
