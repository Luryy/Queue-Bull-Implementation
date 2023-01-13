import { OnWorkerEvent, Processor, WorkerHost } from '@nestjs/bullmq';
import { Injectable } from '@nestjs/common';
import { Job } from 'bullmq';
import { setTimeout } from 'timers/promises';

@Processor('Test')
@Injectable()
export class TestJob extends WorkerHost {
  async process(job: Job<any, any, string>): Promise<any> {
    console.log(job.data);
    job.updateProgress(50);
    job.log('Log');

    await setTimeout(15 * 1000);

    job.log('FINISHED');
    console.log('done');
    job.updateProgress(99);
  }

  @OnWorkerEvent('completed')
  onCompleted(job: Job<any, any, string>) {
    job.updateProgress(100);
    // console.log(job);
  }

  @OnWorkerEvent('ready')
  onReady() {
    this.worker.concurrency = 3;
    console.log('ready ------------');
  }

  @OnWorkerEvent('active')
  onActive() {
    console.log(' ------------ active');
  }
}
