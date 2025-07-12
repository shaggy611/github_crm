import { registerAs } from '@nestjs/config';
import { config as dotenvConfig } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import * as path from 'path';

dotenvConfig({ path: '.env' });

const config = {
    type: 'postgres',
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT, 10),
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    entities: [path.join(__dirname, '..', '**/*.entity{.ts,.js}')],
    migrations: [path.join(__dirname, '..', 'migrations/*{.ts,.js}')],
    namingStrategy: new SnakeNamingStrategy(),
    synchronize: true,
    autoLoadEntities: true,
} as DataSourceOptions;

export default registerAs('typeorm', () => config);

export const connectionSource = new DataSource(config);
