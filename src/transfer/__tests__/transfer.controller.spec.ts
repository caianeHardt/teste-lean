import { Test, TestingModule } from '@nestjs/testing';
import { TransferService } from '../services/transfer.service';
import { TransferController } from '../controllers/transfer.controller';
import { TransferRequestDto } from '../dto/transfer.dto';

describe('TransferController', () => {
    let transferController: TransferController;
    let transferService: TransferService;

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
        controllers: [TransferController],
        providers: [TransferService,
            {
                provide: TransferService,
                useValue: {
                transfer: jest.fn(),
                },
            },
        ],
    }).compile();

    transferController = app.get<TransferController>(TransferController);
    transferService = app.get<TransferService>(TransferService);
});

    describe('.transfer', () => {
        it('should call service with arguments corrects', async () => {
            const transferDto: TransferRequestDto = {
                value: 100,
                payee: 123,
                payer: 321,
            }
            await transferController.transfer(transferDto);
            expect(transferService.transfer).toHaveBeenCalledWith(transferDto);
        });
    });
});
