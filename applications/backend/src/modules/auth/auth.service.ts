import {BadRequestException, Injectable} from '@nestjs/common';
import {AccountsService} from "../accounts/accounts.service";
import {RegisterDTO} from "./dto/register.dto";
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private readonly accountService: AccountsService
    ) {}

    async registerUser(context: RegisterDTO) {
        const {
            email,
            password
        } = context;

        const existingUser = await this.accountService.findAccountByEmail(email);

        if (existingUser) {
            throw new BadRequestException('Account already exists');
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const createAccountDto: RegisterDTO = {
            email,
            password: hashedPassword,
        };

        return await this.accountService.createAccount(createAccountDto);
    }
}
