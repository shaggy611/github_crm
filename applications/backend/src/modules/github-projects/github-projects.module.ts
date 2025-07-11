import {Module} from '@nestjs/common';
import {GithubProjectsService} from './github-projects.service';
import {GithubModule} from "../github/github.module";
import {TypeOrmModule} from "@nestjs/typeorm";
import {GithubProject} from "../../entities/github-project.entity";
import {GithubProjectsController} from "./github-projects.controller";
import {AccountsModule} from "../accounts/accounts.module";

@Module({
    providers: [GithubProjectsService],
    imports: [
        TypeOrmModule.forFeature([GithubProject]),
        GithubModule,
        AccountsModule
    ],
    exports: [GithubProjectsService],
    controllers: [GithubProjectsController]
})
export class GithubProjectsModule {
}
