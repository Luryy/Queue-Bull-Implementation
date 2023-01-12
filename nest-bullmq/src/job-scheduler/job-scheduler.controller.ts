import { InjectQueue } from '@nestjs/bullmq';
import { Body, Controller, Post } from '@nestjs/common';
import { Queue } from 'bullmq';

@Controller('/bull-test')
export class JobSchedulerController {
  constructor(@InjectQueue('Test') private testQueue: Queue) {}

  @Post()
  async enqueue(@Body() body: any): Promise<{ teste: string; data: number }> {
    const { teste } = body;

    console.log(teste);
    this.testQueue.add('Test', { teste }, {});

    return { teste, data: new Date().getSeconds() };
  }
}
