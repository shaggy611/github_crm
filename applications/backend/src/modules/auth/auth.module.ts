import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AccountsModule } from "../accounts/accounts.module";
import {AuthController} from "./auth.controller";

@Module({
  imports: [AccountsModule],
  providers: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
