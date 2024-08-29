import { Test, TestingModule } from '@nestjs/testing';
import { User } from '../entities/user.entity';
import { UserController } from '../controllers/user.controller';
import { UserService } from '../services/user.service';
import { CreateUserDto } from '../dto/create-user.request.dto';


describe('TransferController', () => {
    let userController: UserController;
    let userService: UserService;

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
        controllers: [UserController],
        providers: [UserService,
            {
                provide: UserService,
                useValue: {
                transfer: jest.fn(),
                },
            },
        ],
    }).compile();

    userController = app.get<UserController>(UserController);
    userService = app.get<UserService>(UserService);
});

    describe('.createUser', () => {
        it('should call service with arguments corrects', async () => {
            const user: CreateUserDto = {
                name: 'John Doe',
                email: 'email@email.com',
                password: '123456',
                userType: 1,
                document_number: '123456789',
            }
            await userController.createUser(user);
            expect(userService.createUser).toHaveBeenCalledWith(user);
        });
    });
});
