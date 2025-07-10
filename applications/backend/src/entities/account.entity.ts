import { Column, Entity, Unique } from 'typeorm';
import { BaseEntity } from "./base.entity";
import {hash as hashFunction} from 'bcrypt';

@Entity('accounts')
@Unique(['email'])
export class Account extends BaseEntity {
    @Column()
    email: string;

    @Column()
    password: string;

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
