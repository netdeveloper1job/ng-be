
import { UserStatus } from "src/common/model/userStatus";
import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from "typeorm";


@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({unique: true})
    email: string;

    @Column({nullable: true})
    password: string;

    @Column({default: UserStatus.ACTIVE})
    status: UserStatus;


}
