import express from 'express';

import { Queue } from 'bullmq';
import {
  BullMQAdapter,
  createBullBoard,
  ExpressAdapter,
} from '@bull-board/express';
import TestJob from './jobs/TestJob';

const app = express();
app.use(express.json());

const queue = new Queue('main');

bullBoardSetup();
app.post('/bull-test', async (request, response) => {
  const { teste } = request.body;

  queue.add(TestJob.name, { teste }, TestJob.options);

  response.json({ teste, data: new Date().getSeconds() });
});

export default app;

function bullBoardSetup() {
  const serverAdapter = new ExpressAdapter();
  serverAdapter.setBasePath('/admin/bull-board-queues');

  const bullBoardQueues = [new BullMQAdapter(queue)];

  createBullBoard({
    queues: bullBoardQueues,
    serverAdapter,
  });

  app.use('/admin/bull-board-queues', serverAdapter.getRouter());
}
