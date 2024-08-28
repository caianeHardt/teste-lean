import * as path from 'path';
import { Module } from '@nestjs/common';
import { TransferModule } from './transfer/transfer.module';
import { AppController } from './app.controller';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { GetAppConfiguration } from './config/configuration';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmFactory } from './config/typeOrmModule';

const ENV = process.env.NODE_ENV || 'development';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ENV,
      load: [GetAppConfiguration],

    }),
    TypeOrmModule.forRootAsync({ useClass: TypeOrmFactory }),
    TransferModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
