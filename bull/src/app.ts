import express from 'express';

import { UI } from 'bull-board';
import Queue from './providers/QueueProvider/implementations/BullQueueProvider';

const app = express();
app.use(express.json());

const queue = new Queue();

const { bullBoardAdapter } = queue.uiRegister();

app.use('/admin/queues', UI);
app.use('/admin/bull-board-queues', bullBoardAdapter.getRouter());
app.post('/bull-test', async (request, response) => {
  const { teste } = request.body;

  queue.add('TestJob', { teste });

  response.json({ teste, data: new Date().getSeconds() });
});

export default app;
