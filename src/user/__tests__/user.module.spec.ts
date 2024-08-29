import { Test, TestingModule } from "@nestjs/testing";
import { UserModule } from "../user.module";

describe('UserModule', () => {
    it('should be defined', async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [UserModule],
        }).compile();
        expect(module).toBeDefined();
    });
});