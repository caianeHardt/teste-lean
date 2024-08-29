import { Module } from "@nestjs/common";
import { UserType } from "./entities/user_type.entity";
import { User } from "./entities/user.entity";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module(

    {
        imports: [UserType, TypeOrmModule.forFeature([User, UserType])],
        controllers: [],
        providers: [],
        exports: [TypeOrmModule.forFeature([User, UserType])]
    }
)
export class UserModule{}