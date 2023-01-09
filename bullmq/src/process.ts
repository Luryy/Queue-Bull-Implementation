import { Worker } from 'bullmq';
import TestJob from './jobs/TestJob';

const worker = new Worker('main', async job => {

  await (new TestJob(job)).handle();
});
