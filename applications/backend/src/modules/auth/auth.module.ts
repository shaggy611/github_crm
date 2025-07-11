import {Module} from '@nestjs/common';
import {AuthService} from './auth.service';
import {AccountsModule} from "../accounts/accounts.module";
import {AuthController} from "./auth.controller";
import {JwtStrategy} from "./jwt.strategy";
import {PassportModule} from "@nestjs/passport";
import {JwtModule} from "@nestjs/jwt";

@Module({
    imports: [
        AccountsModule,
        PassportModule,

        JwtModule.register({
            secret: process.env.JWT_SECRET,
            signOptions: { expiresIn: '1d' },
        }),
    ],
    providers: [AuthService, JwtStrategy],
    controllers: [AuthController]
})
export class AuthModule {
}
