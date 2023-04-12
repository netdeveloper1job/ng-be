import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { NoteStatus } from "./status.enum";

@Entity()
export class Note {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column({type: 'longtext'})
    description: string;

    @Column()
    userId: string;

    @Column({ default: NoteStatus.INACTIVE })
    status: NoteStatus;
}
