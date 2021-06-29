/*
* Node Version: V12.3+
* File Name: index
* Auther: Yao
* Date Created: 2021-06-28
*/


const path = require("path");


module.exports = [
    `../schema/common/address.json`,
    `../schema/common/amount.json`,
    `../schema/common/currency.json`,
    `../schema/common/sinteger.json`,

    `../schema/api/query_event_list.json`,
    `../schema/api/query_gas_price.json`,
].map((element, index, array) => {
    return path.join(__dirname, element);
});
