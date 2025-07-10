import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { Account } from "../../entities/account.entity";
import { Repository } from "typeorm";
import {AccountDTO} from "./dto/account.dto";

@Injectable()
export class AccountsService {
    constructor(
        @InjectRepository(Account)
        private accountRepository: Repository<Account>
    ) {
    }

    async createAccount(context: AccountDTO): Promise<Account> {
        const {
            email,
            password,
        } = context;

        const account = Account.create({
            email,
            password,
        });

        await this.accountRepository.save(account);

        return account;
    }

    async findAccountByEmail(email: string): Promise<Account | null> {
        return this.accountRepository.findOne({
            where: {email}
        })
    }
}
