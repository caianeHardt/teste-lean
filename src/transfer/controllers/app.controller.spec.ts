import { Test, TestingModule } from '@nestjs/testing';
import { TransferController } from './transfer.controller';
import { TransferService } from '../services/transfer.service';

describe('TransferController', () => {
  let transferController: TransferController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [TransferController],
      providers: [TransferService],
    }).compile();

    transferController = app.get<TransferController>(TransferController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      // expect(appController.createUser('e')).toBe('Hello World!');
    });
  });
});
