import { Injectable } from '@nestjs/common';
import { Repository } from "typeorm";
import { Account } from "../entities/account.entity";
import { DataSource } from 'typeorm';

@Injectable()
export class AccountsRepository extends  Repository<Account> {
    constructor(private dataSource: DataSource) {
        super(Account, dataSource.createEntityManager());
    }
}
