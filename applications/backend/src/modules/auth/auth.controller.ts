import {AuthService} from "./auth.service";
import {Body, Controller, Post} from "@nestjs/common";
import {AuthDTO} from "./dto/register.dto";

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ) {}

    @Post('register')
    async register(@Body() context: AuthDTO) {
        return this.authService.registerAccount(context);
    }

    @Post('login')
    async login(@Body() context: AuthDTO) {
        return this.authService.loginAccount(context);
    }
}
