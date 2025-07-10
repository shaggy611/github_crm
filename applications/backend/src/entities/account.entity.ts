import { Column, Entity, Unique } from 'typeorm';
import { BaseEntity } from "./base.entity";

@Entity('accounts')
@Unique(['email'])
export class Account extends BaseEntity {
    @Column()
    email: string;

    @Column()
    password: string;
}
