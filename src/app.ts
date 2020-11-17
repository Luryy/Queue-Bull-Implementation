import express from 'express';

import Queue from './providers/QueueProvider/implementations/BullQueueProvider';

const app = express();
app.use(express.json());

const queue = new Queue();

queue.process();

app.post('/bull-test', async (request, response) => {
  const { teste } = request.body;

  queue.add('TestJob', { teste });

  response.json({ teste, data: new Date().getSeconds() });
});

export default app;
