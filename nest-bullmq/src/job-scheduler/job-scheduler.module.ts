import { BullModule } from '@nestjs/bullmq';
import { Module } from '@nestjs/common';
import { JobSchedulerController } from './job-scheduler.controller';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'Test',
    }),
  ],
  controllers: [JobSchedulerController],
})
export class JobSchedulerModule {}
