import {Column, Entity, JoinColumn, ManyToOne} from 'typeorm';
import {BaseEntity} from "./base.entity";
import {Account} from "./account.entity";
import {GithubRepoInfo} from "../modules/github-projects/types/githubRepoInfo.type";

@Entity('projects')
export class GithubProject extends BaseEntity {
    @Column()
    owner: string;

    @Column()
    name: string;

    @Column()
    url: string;

    @Column({type: 'int', nullable: true})
    stars: number;

    @Column({type: 'int', nullable: true})
    forks: number;

    @Column({type: 'int', nullable: true})
    issues: number;

    @Column({type: 'bigint', nullable: true})
    createdAtUtc: number;

    @ManyToOne(() => Account, (account) => account.projects, {onDelete: 'CASCADE'})
    @JoinColumn({ name: 'account_id' })
    account: Account;


    static create(context: GithubRepoInfo) {
        const {
            owner,
            createdAtUtc,
            forks,
            issues,
            name,
            stars,
            url,
            account
        } = context;

        const project = new GithubProject();

        project.name = name;
        project.owner = owner;
        project.createdAtUtc = createdAtUtc;
        project.forks = forks;
        project.issues = issues;
        project.stars = stars;
        project.url = url;
        project.account = account;

        return project;
    }
}
