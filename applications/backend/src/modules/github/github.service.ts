import {Injectable, NotFoundException} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import {firstValueFrom} from "rxjs";
import {GithubRepoInfo} from "../github-projects/types/githubRepoInfo.type";

@Injectable()
export class GithubService {
    constructor(
       private readonly httpService: HttpService
    ) {}

    async fetchRepoData(name: string): Promise<GithubRepoInfo> {
        const url = `https://api.github.com/repos/${name}`;

        try {
            const response = await firstValueFrom(this.httpService.get(url));
            const data = response.data;

            return {
                owner: data.owner.login,
                name: data.name,
                url: data.html_url,
                stars: data.stargazers_count,
                forks: data.forks_count,
                issues: data.open_issues_count,
                createdAtUtc: new Date(data.created_at).getTime(),
            };
        } catch (error) {
            throw new NotFoundException('Repo not found on GitHub');
        }
    }
}
