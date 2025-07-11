import {Column, Entity, OneToMany, Unique} from 'typeorm';
import { BaseEntity } from "./base.entity";
import {GithubProject} from "./github-project.entity";

@Entity('accounts')
// @Unique(['email'])
export class Account extends BaseEntity {
    @Column()
    email: string;

    @Column()
    password: string;

    @OneToMany(() => GithubProject, (project) => project.account)
    projects: GithubProject[];

    static create(context) {
        const {
            email,
            password,
        } = context;

        const account = new Account();

        account.email = email;
        account.password = password;

        return account;
    }
}
