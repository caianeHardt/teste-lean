import { Test, TestingModule } from '@nestjs/testing';
import { TransferService } from '../services/transfer.service';
import { TransferController } from '../controllers/transfer.controller';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Account } from '../entities/account.entity';
import { Transaction } from '../entities/transaction.entity';
import { User } from '../../user/entities/user.entity';
import { Repository } from 'typeorm';
import { TransferRequestDto } from '../dto/transfer.dto';

describe('UserService', () => {
    let transferService: TransferService;
    let transferController: TransferController;
    let accountRepository: Repository<Account>;
    let transactionRepository: Repository<Transaction>;
    let userRepository: Repository<User>;

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            controllers: [TransferController],
            providers: [TransferService,
                {
                    provide: getRepositoryToken(Account),
                    useValue: {
                        save: jest.fn(),
                        findOne: jest.fn(),
                        update: jest.fn(),                
                    },
                },
                {
                    provide:getRepositoryToken(Transaction),
                    useValue: {
                        save: jest.fn(),
                        find: jest.fn(),
                        update: jest.fn(),                
                    },
                },
                {
                    provide: getRepositoryToken(User),
                    useValue: {
                        save: jest.fn(),
                        find: jest.fn(),
                        update: jest.fn(),                
                    },
                }
            ],
        }).compile();

        transferController = app.get<TransferController>(TransferController);
        transferService = app.get<TransferService>(TransferService);
        accountRepository = app.get(getRepositoryToken(Account));
        transactionRepository = app.get(getRepositoryToken(Transaction));
        userRepository = app.get(getRepositoryToken(User));
    });

    it('should be defined', () => {
        expect(transferService).toBeDefined();
    });

    describe('.transfer', () => {
        it('should transfer with success', async () => {
            const transferDto: TransferRequestDto = {
                payer: 1,
                payee: 2,
                value: 100
            }

            const returnTransfer = {
                message: 'Transfer completed successfully',
                value: 100,
                payer: 1,
                payee: 2,
                date: expect.any(Date),
            }
            jest.spyOn(accountRepository, 'findOne').mockResolvedValueOnce(Promise.resolve({ id: 1, balance: 100 }) as Promise<Account>);
            jest.spyOn(accountRepository, 'findOne').mockResolvedValueOnce(Promise.resolve({ id: 2, balance: 100 }) as Promise<Account>);
            jest.spyOn(transferService, 'hasPermissionForTransfer').mockResolvedValueOnce(true);
            jest.spyOn(transferService, 'userHasBalance').mockResolvedValueOnce(true);
            jest.spyOn(transferService, 'transferValue').mockResolvedValueOnce();

            const result = await transferController.transfer(transferDto);
            expect(result).toEqual(returnTransfer);
        })
    });
});
