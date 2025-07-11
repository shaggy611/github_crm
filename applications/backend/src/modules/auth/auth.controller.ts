import {AuthService} from "./auth.service";
import {Body, Controller, Get, Post, UseGuards} from "@nestjs/common";
import {AuthDTO} from "./dto/register.dto";
import {JwtAuthGuard} from "./jwt-auth.guard";

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

    // @UseGuards(JwtAuthGuard)
    // @Get('repositories')
    // getRepositories(@Request() req) {
    //     return req.user;
    // }
}
