/*
* Node Version: V12.3+
* File Name: health
* Auther: Yao
* Date Created: 2021-06-28
*/


class HealthApiView {
    static heartbeat(request) {
        return {
            "uuid": request.parameter.reqid,                                                          // 请求UUIDstring
        };
    }

}


module.exports = {
    HealthApiView,
};
