import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";

@Injectable()
export class TypeOrmFactory implements TypeOrmOptionsFactory {
    constructor(private readonly configService: ConfigService) {}

    createTypeOrmOptions(): TypeOrmModuleOptions {
        return {
            url: this.configService.get('database.url'),
            type: 'postgres',
            ssl: this.configService.get('database.ssl'),
            autoLoadEntities: true,
        } as TypeOrmModuleOptions;
    }
}