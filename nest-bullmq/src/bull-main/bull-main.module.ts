import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { Queue } from 'bullmq';
import { BullBoardMiddleware } from './bull-board.middleware';
import { getQueuesRegistrations, getQueuesTokens } from './bull-queues.helper';

const queuesNames = ['Test', 'Other', 'Another'];
const queuesRegistrations = getQueuesRegistrations(queuesNames);
@Module({
  imports: queuesRegistrations,
  exports: queuesRegistrations,
  providers: [
    {
      provide: 'Queues',
      useFactory: (...queue: Queue[]) => queue,
      inject: getQueuesTokens(queuesNames),
    },
  ],
})
export class BullMainModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(BullBoardMiddleware).forRoutes('/bull-board');
  }
}
