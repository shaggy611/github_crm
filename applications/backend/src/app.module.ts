import {Module, Global} from '@nestjs/common';
import {ConfigModule, ConfigService} from '@nestjs/config';
import typeorm from './config/typeorm';
import {TypeOrmModule} from '@nestjs/typeorm';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {AuthModule} from './modules/auth/auth.module';
import {AccountsModule} from "./modules/accounts/accounts.module";
import { GithubModule } from './modules/github/github.module';
import {GithubProjectsModule} from "./modules/github-projects/github-projects.module";

@Global()
@Module({
    imports: [
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
        GithubModule,
        GithubProjectsModule
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
