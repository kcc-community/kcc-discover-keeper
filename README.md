# bridge-keeper

English | [简体中文](README_CN.md)

## Service
```javascript
// install
npm install --production

// start
pm2 start start.config.js
┌─────┬─────────────────────────────────┬─────────────┬─────────┬─────────┬──────────┬────────┬──────┬───────────┬──────────┬──────────┬──────────┬──────────┐
│ id  │ name                            │ namespace   │ version │ mode    │ pid      │ uptime │ ↺    │ status    │ cpu      │ mem      │ user     │ watching │
├─────┼─────────────────────────────────┼─────────────┼─────────┼─────────┼──────────┼────────┼──────┼───────────┼──────────┼──────────┼──────────┼──────────┤
│ 0   │ bridge-keeper-api-server        │ default     │ 1.0.0   │ fork    │ 19763    │ 83s    │ 0    │ online    │ 0%       │ 81.8mb   │ *        │ disabled │
│ 1   │ bridge-keeper-eth-core-event    │ default     │ 1.0.0   │ fork    │ 19764    │ 83s    │ 0    │ online    │ 0%       │ 90.3mb   │ *        │ disabled │
│ 2   │ bridge-keeper-eth-gasprice      │ default     │ 1.0.0   │ fork    │ 19766    │ 83s    │ 0    │ online    │ 0%       │ 88.2mb   │ *        │ disabled │
│ 3   │ bridge-keeper-kcc-core-event    │ default     │ 1.0.0   │ fork    │ 19769    │ 83s    │ 0    │ online    │ 0%       │ 91.1mb   │ *        │ disabled │
│ 4   │ bridge-keeper-kcc-pair-event    │ default     │ 1.0.0   │ fork    │ 19771    │ 83s    │ 0    │ online    │ 0%       │ 90.2mb   │ *        │ disabled │
└─────┴─────────────────────────────────┴─────────────┴─────────┴─────────┴──────────┴────────┴──────┴───────────┴──────────┴──────────┴──────────┴──────────┘
```