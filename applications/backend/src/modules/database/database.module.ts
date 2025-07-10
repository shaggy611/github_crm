import { Module } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import { DatabaseService } from './database.service';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: 'localhost',
            port: 5432,
            username: 'crm_user',
            password: 'c7fw63jd32aw3',
            database: 'crm',
            autoLoadEntities: true,
            synchronize: true,
        }),
    ],
    exports: [DatabaseService],
    providers: [DatabaseService]
})
export class DatabaseModule {}
