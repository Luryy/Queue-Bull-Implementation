import TestJob from '@src/jobs/TestJob';
import { Queue } from 'bullmq';

const queue = new Queue('main');

queue.add(TestJob.name, { from: 'cron' }).then(() => process.exit(0));
