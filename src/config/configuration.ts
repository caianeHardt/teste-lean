import * as dotenv from 'dotenv';

const ENV = process.env.NODE_ENV || '.env.dev';
dotenv.config({ path: '.env.dev' });

export const GetAppConfiguration = () => ({
    env: ENV,
    port: 5000,
    bind: '0.0.0.0',
    pathPrefix: 'api',
    app: {
        port: parseInt(process.env.PORT, 10) || 3000,
    },
    documentation: {
        title: 'Lean StartUp Fintech Documentation',
        description: 'Startup API',
        enable: true,
    },
    database: {
        type: process.env.TYPE || 'postgres',
        url:  `postgresql://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
        ssl: process.env.DB_SSL === 'true',
    }
});

export const GetSwaggerConfiguration = () => ({
    swagger: {
        title: 'Lean StartUp Fintech API',
        description: 'API documentation for Lean StartUp Fintech',
        version: '1.0.0',
    },
});