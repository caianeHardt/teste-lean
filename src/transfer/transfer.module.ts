import { Module } from "@nestjs/common";
import { TransferController } from "./controllers/transfer.controller";
import { TransferService } from "./services/transfer.service";
import { Account } from "./entities/account.entity";
import { Transaction } from "./entities/transaction.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserModule } from "src/user/user.module";
import { User } from "src/user/entities/user.entity";

@Module(

    {
        imports: [Account, Transaction, TypeOrmModule.forFeature([Account, Transaction, User])],
        controllers: [TransferController],
        providers: [TransferService],
        exports: [TypeOrmModule.forFeature([Account, Transaction])]
    }
)
export class TransferModule{}