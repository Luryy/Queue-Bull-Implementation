import { Job, Queue, JobOptions, DoneCallback } from 'bull';

interface IJob {
  bull: Queue;
  name: string;
  handle(job: Job<{ [key: string]: any }>, done: DoneCallback): Promise<void>;
  options: JobOptions;
}

export default interface IQueueProvider {
  queues: IJob[];
  add(name: string, data: { [key: string]: any }): Promise<Job | null>;
  process(): Promise<void | null>;
  uiRegister(): any;
}
