import { DoneCallback, JobOptions } from 'bull';

interface IJob {
  key: string;
  options: JobOptions;
  handle({ data }: { [key: string]: any }, done?: DoneCallback): Promise<void>;
}

class TestJob {
  private key = 'TestJob';

  private options: JobOptions = {
    delay: 1000,
  };

  private async handle(
    { data }: { [key: string]: any },
    done: DoneCallback,
  ): Promise<void> {
    console.log(data);
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
