import IQueueProvider from '../models/IQueueProvider';

class FakeQueueProvider implements IQueueProvider {
  public queues = [];

  public async add(): Promise<null> {
    return null;
  }

  public async process(): Promise<null> {
    return null;
  }

  public uiRegister(): null {
    return null;
  }
}

export default FakeQueueProvider;
