import {Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {GithubProject} from "../../entities/github-project.entity";
import {Repository} from "typeorm";
import {GithubService} from "../github/github.service";
import {CreateProjectDTO} from "./dto/createProject.dto";
import {AccountsService} from "../accounts/accounts.service";

@Injectable()
export class GithubProjectsService {
    constructor(
        @InjectRepository(GithubProject)
        private projectsRepository: Repository<GithubProject>,
        private githubService: GithubService,
        private accountService: AccountsService,
    ) {
    }

    async createProject(context: CreateProjectDTO, req): Promise<GithubProject> {
        const {name} = context;

        const userEmail = req.user.email;
        const account = await this.accountService.findAccountByEmail(userEmail);

        const githubRepoInfo = await this.githubService.fetchRepoData(name);

        const project = GithubProject.create({
            ...githubRepoInfo,
            account
        });

        await this.projectsRepository.save(project);

        return project;
    }

    async findAllreposByAccountId(context) {
        const userEmail = context.user.email;

        const {id} = await this.accountService.findAccountByEmail(userEmail);

        return await this.findAllreposByAccountId(id);
    }
}
