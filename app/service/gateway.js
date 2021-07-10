/*
* Node Version: V12.3+
* File Name: gateway
* Auther: Yao
* Date Created: 2021-06-28
*/


const {gateway: __gateway__} = require("../config/config");
const logger                 = require("node-common-sdk").logger(__gateway__.logDir, __gateway__.logLevel, __gateway__.name);
const schema                 = require("node-common-sdk").validator(require("../schema"));
const Koa                    = require("koa");
const cors                   = require("@koa/cors");
const {AppHook}              = require("../middleware/hook");
const {router}               = require("../controller");
const app                    = new Koa();


// app.use(cors());
// app.use(AppHook.ApiLimiter());
app.use(AppHook.BodyParser());
app.use(AppHook.onMessage);
app.use(router.routes());
app.on("error", AppHook.onException);
process.on("SIGINT", AppHook.onStop);


module.exports = (async () => {

    return app.listen(__gateway__.port, __gateway__.host, async () => {
        logger.info(`Listening on http://${__gateway__.host}:${__gateway__.port}`);
    });
})();
