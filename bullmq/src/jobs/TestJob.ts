import { Job, JobsOptions } from 'bullmq';
import { setTimeout } from 'timers/promises';

class TestJob {
  static readonly options: JobsOptions = {
    delay: 1000,
  } as const;

  constructor(private job: Job) {}

  public async handle(): Promise<void> {
    console.log(this.job.data);
    this.job.updateProgress(50);
    this.job.log('Log');

    await setTimeout(15 * 1000);

    this.job.log('FINISHED');
    console.log('done');
    this.job.updateProgress(100);
  }
}

export default TestJob;
