import {BadRequestException, Injectable, UnauthorizedException} from '@nestjs/common';
import {AccountsService} from "../accounts/accounts.service";
import {AuthDTO} from "./dto/register.dto";
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private readonly accountService: AccountsService,
        private readonly jwtService: JwtService,
    ) {
    }

    async registerAccount(context: AuthDTO) {
        const {
            email,
            password
        } = context;

        const existingUser = await this.accountService.findAccountByEmail(email);

        if (existingUser) throw new BadRequestException('Account already exists');

        const hashedPassword = await bcrypt.hash(password, 10);

        const createAccountDto: AuthDTO = {
            email,
            password: hashedPassword,
        };

        const account = await this.accountService.createAccount(createAccountDto);

        return {
            id: account?.id,
            createdAt: account?.createdAt,
            email: account?.email
        };
    }

    async login(user: any) {
        const payload = { email: user.email, sub: user.id };
        return {
            access_token: this.jwtService.sign(payload),
            email: payload?.email
        };
    }

    async loginAccount(context: AuthDTO) {
        const {
            email,
            password
        } = context;

        const user = await this.accountService.findAccountByEmail(email);
        if (!user) throw new UnauthorizedException('Invalid credentials');

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) throw new UnauthorizedException('Invalid credentials');

        return this.login(user);
    }
}
