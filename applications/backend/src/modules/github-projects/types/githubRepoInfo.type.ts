import {Account} from "../../../entities/account.entity";

export interface GithubRepoInfo {
    name: string;
    owner: string;
    url: string;
    stars?: number;
    forks?: number;
    issues?: number;
    createdAtUtc?: number
    account?: Account
}
