import { ExpressAdapter, createBullBoard } from '@bull-board/express';
import { Inject, Injectable, NestMiddleware } from '@nestjs/common';
import { Queue } from 'bullmq';
import { getBullBoardQueuesAdapted } from './bull-queues.helper';

@Injectable()
export class BullBoardMiddleware implements NestMiddleware {
  @Inject('Queues')
  private readonly queues: Queue[];
  use(req: any, res: any, next: () => void) {
    const serverAdapter = new ExpressAdapter();
    const { addQueue, removeQueue, setQueues, replaceQueues } = createBullBoard(
      {
        queues: getBullBoardQueuesAdapted(this.queues),
        serverAdapter,
      },
    );
    serverAdapter.setBasePath('/bull-board');
    const router = serverAdapter.getRouter();
    router(req, res, next);
  }
}
