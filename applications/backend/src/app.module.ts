import {Module, Global} from '@nestjs/common';
import {ConfigModule, ConfigService} from '@nestjs/config';
import typeorm from './config/typeorm';
import {TypeOrmModule} from '@nestjs/typeorm';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {AuthModule} from './modules/auth/auth.module';
import {AccountsModule} from "./modules/accounts/accounts.module";

@Global()
@Module({
    imports: [
        // DatabaseModule,
        AuthModule,
        AccountsModule,

        ConfigModule.forRoot({
            load: [typeorm],
            isGlobal: true,
        }),
        TypeOrmModule.forRootAsync({
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) =>
                configService.get('typeorm'),
        }),
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
