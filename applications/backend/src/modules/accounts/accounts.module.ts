import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountsRepository } from "../../repository/accounts.repository";

@Module({
    imports: [TypeOrmModule.forFeature([
        AccountsRepository
    ])]
})
export class AccountsModule {}
