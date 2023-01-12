import { BullModule } from '@nestjs/bullmq';
import { Module } from '@nestjs/common';
import { TestJob } from './test.job';

@Module({
  imports: [
    BullModule.forRoot({
      connection: {
        host: 'localhost',
        port: 6379,
      },
    }),
    BullModule.registerQueue({
      name: 'Test',
    }),
  ],
  providers: [TestJob],
})
export class JobsModule {}
