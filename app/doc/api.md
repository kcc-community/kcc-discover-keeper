### Document Index
* [Interface definition](#interface definition)
* [Service heartbeat detection](#Service heartbeat detection)
* [Query chain gasPrice](#Query chain gasPrice)
* [Query event list](#Query event list)

# Interface definition
## Request parameters
| Field | Type | Required | Description |
| ------------ | ------ | ---- | -------------- |
| X-B3-Traceid | String | yes | carry in the header |

## Successful response
| Field | Type | Required | Description |
| --------- | ------- | ---- | --------------- |
| code | Int | yes | response code 0-success |
| data | Object | yes | response content |
| msg | String | yes | response message |
| signature | String | yes | response signature |
| success | Boolean | yes | success |

## Response example
```javascript
{
    "code":0,
    "data":{},
    "msg":"SUCCESS",
    "signature":null,
    "success":true
}
```

# Service heartbeat detection
## Request method
**GET**

## Request interface
**/v1/bridge/keeper/heartbeat**

## Request parameters
| Field | Type | Required | Description |
| ---- | ---- | ---- | ---- |

## Successful response
| Field | Type | Required | Description |
| ---- | ------ | ---- | ---- |
| uuid | String | yes | |

## Response example
```javascript
{
    "code": 0,
    "data": {
        "uuid": "99ca339121344e18"
    },
    "msg": "SUCCESS",
    "signature": null,
    "success": true
}
```

# Query chain gasPrice
## Request method

**GET**
## Request interface
**/v1/bridge/keeper/gasprice**

## Request parameters
| Field | Type | Required | Description |
| ----- | ------ | ---- | ---- |
| chain | String | yes | chain |

## Successful response
| Field | Type | Required | Description |
| ---------- | ------ | ---- | ---------- |
| chain | String | yes | chain |
| fastest | String | yes | GWei |
| fast | String | yes | fast (GWei) |
| source | String | yes | source |
| status | Int | yes | 1 it's valid |
| updateTime | String | yes | update time |

## Response example
```javascript
{
    "code": 0,
    "data": {
        "chain": "eth",
        "fastest": "12",
        "fast": "10",
        "source": "gasnow",
        "status": 1,
        "updateTime": "2021-07-02 14:14:00.396"
    },
    "msg": "SUCCESS",
    "signature": null,
    "success": true
}
```

# Query event list
## Request method
**GET**

## Request interface
**/v1/bridge/keeper/event**

## Request parameters
| Field | Type | Required | Description |
| ----- | ------ | ----------- | -------- |
| id | Int | No, default 0 | id |
| chain | String | No | chain |
| txHash | String | No | txHash |
| logIndex | String | No | logIndex |
| page | Int | No, default 1 | current page number |
| limit | Int | No, default 100 | size per page |

## Successful response
| Field | Type | Required | Description |
| ----------- | ------ | ---- | -------- |
| id | Int | yes | number |
| chain | String | yes | chain |
| address | String | yes | contract address |
| blockHash | String | yes | block Hash |
| blockNumber | Int | yes | block height |
| version | Int | yes | idempotent version |
| txHash | String | yes | transaction Hash |
| txIndex | Int | yes | transaction Index |
| logIndex | Int | yes | event Index |
| event | String | yes | event name |
| args | Object | yes | event parameters |
| status | Int | yes | 1 it's valid |

## Response example
```javascript
{
    "code": 0,
    "data": {
        "page": 1,
        "limit": 10,
        "total": 1,
        "list": [
            {
                "id": 47,
                "chain": "kcc",
                "address": "0x6b9862e7e0203f7D2640E246A15EA961737489b0",
                "blockHash": "0xe23db41b74e626881abeee5426126fe4e352054463f1f286f3b3526fd5c192c5",
                "blockNumber": 2098174,
                "version": 0,
                "txHash": "0x7d18c56a06e74d3c8e9cc56a87c9a0a5537646b9bd26c88a7a351ddce2537213",
                "txIndex": 0,
                "logIndex": 2,
                "event": "WithdrawDoneToken",
                "args": {
                    "0": "0xC211F69500433D8536dB228812aCF47128F8f782",
                    "1": "0x67f6a7BbE0da067A747C6b2bEdF8aBBF7D6f60dc",
                    "2": "200000000000000000000",
                    "3": "eth_C211F69500433D8536dB228812aCF47128F8f782_b70cd1fa88c170da5f4864d8238c176fd4f461f9a199f773fd267d28db6a5a02_13",
                    "to": "0xC211F69500433D8536dB228812aCF47128F8f782",
                    "proof": "eth_C211F69500433D8536dB228812aCF47128F8f782_b70cd1fa88c170da5f4864d8238c176fd4f461f9a199f773fd267d28db6a5a02_13",
                    "token": "0x67f6a7BbE0da067A747C6b2bEdF8aBBF7D6f60dc",
                    "value": "200000000000000000000"
                },
                "status": 1
            }
        ]
    },
    "msg": "SUCCESS",
    "signature": null,
    "success": true
}
```