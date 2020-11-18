import { DoneCallback, Job, JobOptions } from 'bull';

interface IJob {
  key: string;
  options: JobOptions;
  handle(job: Job<{ [key: string]: any }>, done: DoneCallback): Promise<void>;
}

class TestJob {
  private key = 'TestJob';

  private options: JobOptions = {
    delay: 1000,
  };

  private async handle(
    job: Job<{ [key: string]: any }>,
    done: DoneCallback,
  ): Promise<void> {
    console.log(job.data);
    done();
  }

  public getJob(): IJob {
    return {
      key: this.key,
      options: this.options,
      handle: this.handle,
    };
  }
}

export default TestJob;
