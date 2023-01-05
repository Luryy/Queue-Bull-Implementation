import Queue from '../providers/QueueProvider/implementations/BullQueueProvider';

const queue = new Queue();

queue.add('TestJob', { from: 'cron' }).then(() => process.exit(0));
