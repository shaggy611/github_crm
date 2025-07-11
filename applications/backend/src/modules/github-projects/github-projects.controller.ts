import {Body, Controller, Get, Post, UseGuards, Request} from "@nestjs/common";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {GithubProjectsService} from "./github-projects.service";

@Controller('repo')
export class GithubProjectsController {
    constructor(
        private readonly githubProjectsService: GithubProjectsService
    ) {}

    @UseGuards(JwtAuthGuard)
    @Post('create-repository')
    async createProject(@Body() context, @Request() req) {
        return this.githubProjectsService.createProject(context, req);
    }

    @UseGuards(JwtAuthGuard)
    @Get('repositories-list')
    findAllreposByAccountId(@Request() req) {
        return this.githubProjectsService.findAllreposByAccountId(req);
    }
}
