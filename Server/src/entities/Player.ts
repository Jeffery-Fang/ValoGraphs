import {Entity, Column, PrimaryColumn, OneToMany} from 'typeorm';
import { MatchStat } from './MatchStat.js';

@Entity()
export class Player{
    @PrimaryColumn({
        type: "varchar",
        length: 36,
        nullable: false
    })
    id: string;

    @Column({
        type: "varchar",
        length: 36,
        nullable: false
    })
    name: string;

    @Column({
        type: "varchar",
        length: 10,
        nullable: false
    })
    tag: string;

    @OneToMany(() => MatchStat, (match) => match.player)
    matches!: MatchStat[];

    constructor(playerID: string, name: string, tag: string){
        this.id = playerID;
        this.name = name;
        this.tag = tag;
    }
}
