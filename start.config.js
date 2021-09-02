module.exports = {
    apps: [
        {
            name:               "discover-keeper-api-server",
            script:             "./app/service/gateway.js",
            watch:              false,
            ignore_watch:       ["node_modules", "logs", "report"],
            out_file:           "./logs/pm2/gateway.out.log",
            error_file:         "./logs/pm2/gateway.err.log",
            merge_logs:         true,
            max_memory_restart: "1G",
            env:                {NODE_ENV: "production"},
            exec_mode:          "fork",
            instances:          1,
            autorestart:        true,
        },
        {
            name:               "discover-keeper-kcc-core-event",
            script:             "./app/service/dapp_event.js",
            watch:              false,
            ignore_watch:       ["node_modules", "logs", "report"],
            out_file:           "./logs/pm2/cronjob.kcc.core.event.synchronizer.out.log",
            error_file:         "./logs/pm2/cronjob.kcc.core.event.synchronizer.err.log",
            merge_logs:         true,
            max_memory_restart: "1G",
            env:                {NODE_ENV: "production"},
            exec_mode:          "fork",
            instances:          1,
            autorestart:        true,
        }
    ],
};
