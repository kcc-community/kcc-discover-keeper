# kcc-discover-keeper

English | [简体中文](README_CN.md)

## Service
```javascript
// install
npm install --production

// start
pm2 start start.config.js

┌─────┬───────────────────────────────────┬─────────────┬─────────┬─────────┬──────────┬────────┬──────┬───────────┬──────────┬──────────┬──────────┬──────────┐
│ id  │ name                              │ namespace   │ version │ mode    │ pid      │ uptime │ ↺    │ status    │ cpu      │ mem      │ user     │ watching │
├─────┼───────────────────────────────────┼─────────────┼─────────┼─────────┼──────────┼────────┼──────┼───────────┼──────────┼──────────┼──────────┼──────────┤
│ 0   │ discover-keeper-api-server        │ default     │ 1.0.0   │ fork    │ 70903    │ 0s     │ 0    │ online    │ 0%       │ 7.0mb    │ neo      │ disabled │
│ 1   │ discover-keeper-kcc-core-event    │ default     │ 1.0.0   │ fork    │ 70904    │ 0s     │ 0    │ online    │ 0%       │ 352.0kb  │ neo      │ disabled │
└─────┴───────────────────────────────────┴─────────────┴─────────┴─────────┴──────────┴────────┴──────┴───────────┴──────────┴──────────┴──────────┴──────────┘

```