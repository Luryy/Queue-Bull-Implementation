import Bull, { Job } from 'bull';
import { setQueues } from 'bull-board';
import {
  BullAdapter,
  createBullBoard,
  ExpressAdapter,
} from '@bull-board/express';

import jobs from '@src/jobs';
import IQueueProvider from '../models/IQueueProvider';

class Queue implements IQueueProvider {
  public queues = jobs.map(job => ({
    bull: new Bull(job.key, {
      redis: { host: 'localhost', port: 6379 },
    }),
    name: job.key,
    handle: job.handle,
    options: job.options,
  }));

  public async add(
    name: string,
    data: { [key: string]: any },
  ): Promise<Job | null> {
    const queue = this.queues.find(q => q.name === name);

    if (!queue) {
      return null;
    }

    return queue.bull.add(data, queue.options);
  }

  public async process(): Promise<void> {
    return this.queues.forEach(queue => {
      queue.bull.process(queue.handle);

      queue.bull.on('failed', (job, err) => {
        console.log('Job failed', queue.name, job.data);
        console.log(err);
      });
    });
  }

  public uiRegister(): {
    bullBoardAdapter: ExpressAdapter;
  } {
    const serverAdapter = new ExpressAdapter();
    serverAdapter.setBasePath('/admin/bull-board-queues');

    const bullBoardQueues = this.queues.map(
      queue => new BullAdapter(queue.bull),
    );

    createBullBoard({
      queues: bullBoardQueues,
      serverAdapter,
    });

    this.queues.forEach(queue => {
      setQueues(queue.bull);
    });

    return {
      bullBoardAdapter: serverAdapter,
    };
  }
}

export default Queue;
