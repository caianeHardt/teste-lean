import dotenv from 'dotenv';
import { join } from 'path';
import { GetAppConfiguration } from './configuration';
import { DataSource } from 'typeorm';
import { log } from 'console';
import { Logger } from '@nestjs/common';

dotenv.config();

const {
    database: { url, type, ssl },
} = GetAppConfiguration();

console.log('################### url: ', url);

const datasource = new DataSource({
    url,
    type: type as any,
    extra: {
        ssl,
    },
    migrationsTableName: 'migrations_app_lean',
    entities: ['./dist/src/models/**/*.entity*{.ts,.js}'],
    synchronize: false,
    migrations: [join(__dirname, '..', 'migrations', '*{.ts,.js}')],
});
datasource.initialize();

module.exports = { datasource };