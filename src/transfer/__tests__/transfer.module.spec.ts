import { Test, TestingModule } from "@nestjs/testing";
import { TransferModule } from "../transfer.module";

describe('TransferModule', () => {
    it('should be defined', async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [TransferModule],
        }).compile();
        expect(module).toBeDefined();
    });
});