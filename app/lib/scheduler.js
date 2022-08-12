const {
          project: __name__,
          redis,
      }      = require("../config/config");
const Bull   = require("bull");
const logger = require("node-common-sdk").logger();

class Scheduler {
    constructor(name, schedule, callback) {
        this.name     = name || "scheduler-default";
        this.schedule = schedule;
        this.callback = callback;
    }

    async start() {
        const queueName = `${__name__}-${this.name}`;
        const queue     = new Bull(queueName, {
            redis,
            prefix: this.name,
        });
        await queue.add({name: this.name}, {
            repeat:           {cron: this.schedule},
            removeOnComplete: true,
            removeOnFail:     true,
        });
        queue.process(async (job, done) => {
            logger.info(`Queue start: ${job.data.name}`);
            await this.callback();
            done();
            logger.info(`Queue finished: ${job.data.name}`);
        });
    }
}

module.exports = {
    Scheduler,
};