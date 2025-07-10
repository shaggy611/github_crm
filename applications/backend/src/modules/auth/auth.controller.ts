import {AuthService} from "./auth.service";
import {Body, Controller, Post} from "@nestjs/common";
import {RegisterDTO} from "./dto/register.dto";

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ) {}

    @Post('register')
    async register(@Body() context: RegisterDTO) {
        return this.authService.registerUser(context);
    }
}
