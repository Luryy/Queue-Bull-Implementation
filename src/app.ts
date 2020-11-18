import express from 'express';

import { UI } from 'bull-board';
import Queue from './providers/QueueProvider/implementations/BullQueueProvider';

const app = express();
app.use(express.json());

const queue = new Queue();

queue.process();

app.use('/admin/queues', UI);
app.post('/bull-test', async (request, response) => {
  const { teste } = request.body;

  queue.add('TestJob', { teste });

  response.json({ teste, data: new Date().getSeconds() });
});

export default app;
