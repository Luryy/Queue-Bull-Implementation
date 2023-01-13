import { Module } from '@nestjs/common';
import { BullMainModule } from 'src/bull-main/bull-main.module';
import { JobSchedulerController } from './job-scheduler.controller';

@Module({
  controllers: [JobSchedulerController],
  imports: [BullMainModule],
})
export class JobSchedulerModule {}
