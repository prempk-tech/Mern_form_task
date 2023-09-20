/* eslint-disable no-unused-vars */
import { CronJob } from 'cron';

export default function initCronJobs(io) {
  const job1 = new CronJob({
    cronTime: '* * * * *',
    onTick: () => console.log('Job 1 Started'),
    onComplete: () => console.log('Job 1 Completed'),
    start: false,
    runOnInit: false,
  });

  // job1.start();
}