import {Injectable, NotFoundException} from '@nestjs/common';
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

        return this.projectsRepository.find({
            where: {
                account: {
                    id
                }
            },
            order: {
                createdAt: 'DESC'
            }
        })
    }

    async refreshSingleRepositoryById(context, req): Promise<GithubProject> {
        const {id} = context;
        const {id: accountId} = await this.accountService.findAccountByEmail(req.user.email);

        const project = await this.projectsRepository.findOne({
            where: {
                id,
                account: {id: accountId},
            }
        });

        if (!project) throw new NotFoundException('Project not found');

        const freshData = await this.githubService.fetchRepoData(`${project.owner}/${project.name}`);

        project.owner = freshData.owner;
        project.url = freshData.url;
        project.stars = freshData.stars;
        project.forks = freshData.forks;
        project.issues = freshData.issues;
        project.createdAtUtc = freshData.createdAtUtc;

        await this.projectsRepository.save(project);

        return project;
    }

    async deleteSingleRepositoryById(context, req) {
        const {id} = context;

        const {id: accountId} = await this.accountService.findAccountByEmail(req.user.email);

        const project = await this.projectsRepository.findOne({
            where: {
                id,
                account: {id: accountId},
            },
        });

        if (!project) {
            throw new NotFoundException('Project not found or access denied');
        }

        await this.projectsRepository.remove(project);

        return {message: 'Project deleted successfully'};
    }
}
