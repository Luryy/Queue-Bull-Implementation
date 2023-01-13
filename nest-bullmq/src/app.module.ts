import { BullModule } from '@nestjs/bullmq';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JobSchedulerModule } from './job-scheduler/job-scheduler.module';
import { BullMainModule } from './bull-main/bull-main.module';

@Module({
  imports: [
    BullModule.forRoot({
      connection: {
        host: 'localhost',
        port: 6379,
      },
    }),
    JobSchedulerModule,
    BullMainModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
