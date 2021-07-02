# bridge-keeper

English | [简体中文](README_CN.md)

## Service
```javascript
// install
npm install --production

// start
pm2 start start.config.js
┌─────┬───────────────────────────────┬─────────────┬─────────┬─────────┬──────────┬────────┬──────┬───────────┬──────────┬──────────┬──────────┬──────────┐
│ id  │ name                          │ namespace   │ version │ mode    │ pid      │ uptime │ ↺    │ status    │ cpu      │ mem      │ user     │ watching │
├─────┼───────────────────────────────┼─────────────┼─────────┼─────────┼──────────┼────────┼──────┼───────────┼──────────┼──────────┼──────────┼──────────┤
│ 0   │ bridge-keeper-api-server      │ default     │ 1.0.0   │ fork    │ 14568    │ 38m    │ 0    │ online    │ 0%       │ 26.9mb   │ *        │ disabled │
│ 1   │ bridge-keeper-eth-event       │ default     │ 1.0.0   │ fork    │ 14569    │ 38m    │ 0    │ online    │ 0%       │ 77.0mb   │ *        │ disabled │
│ 2   │ bridge-keeper-eth-gasprice    │ default     │ 1.0.0   │ fork    │ 14570    │ 38m    │ 0    │ online    │ 0%       │ 39.0mb   │ *        │ disabled │
│ 3   │ bridge-keeper-kcc-event       │ default     │ 1.0.0   │ fork    │ 14571    │ 38m    │ 0    │ online    │ 0%       │ 77.7mb   │ *        │ disabled │
└─────┴───────────────────────────────┴─────────────┴─────────┴─────────┴──────────┴────────┴──────┴───────────┴──────────┴──────────┴──────────┴──────────┘
```