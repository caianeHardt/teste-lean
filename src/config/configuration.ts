const ENV = process.env.NODE_ENV || 'development';

export const GetAppConfiguration = () => ({
    env: ENV,
    app: {
        port: parseInt(process.env.PORT, 10) || 3000,
    },
    database: {
        type: 'postgres',
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT, 10) || 5432,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        name: process.env.DB_NAME,
        url: process.env.DATABASE_URL,
        ssl: process.env.DB_SSL === 'true',
    }
});