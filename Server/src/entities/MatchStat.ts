import {Entity, Column, PrimaryColumn, ManyToOne, JoinColumn} from 'typeorm';
import { Player } from './Player.js';

@Entity()
export class MatchStat{
    @PrimaryColumn({
        type: "varchar",
        length: 36,
        nullable: false
    })
    matchID: string;

    @PrimaryColumn({
        type: "varchar",
        length: 36
    })
    playerID!: string;
    
    @JoinColumn({name: 'playerID'}) 
    @ManyToOne(() => Player, (player) => player.matches, {
        cascade: true
    })
    player!: Player;

    @Column({
        type: "float",
        nullable: false
    })
    ACS: number;
    
    @Column({
        type: "int",
        nullable: false
    })
    kills: number;

    @Column({
        type: "int",
        nullable: false
    })
    deaths: number;

    @Column({
        type: "int",
        nullable: false
    })
    assists: number;

    @Column({
        type: "float",
        nullable: false
    })
    DD: number;

    @Column({
        type: "float",
        nullable: false
    })
    ADR: number;

    @Column({
        type: "float",
        nullable: false
    })
    HS: number;

    @Column({
        type: "varchar",
        length: 30,
        nullable: false
    })
    agent: string;

    @Column({
        type: "varchar",
        length: 30,
        nullable: false
    })
    map: string;

    @Column({
        type: "varchar",
        length: 30,
        nullable: false
    })
    mode: string;

    @Column({
        type: "boolean",
        nullable: false
    })
    won: boolean;

    @Column({
        type: "varchar",
        length: 4,
        nullable: false
    })
    side: string;

    @Column({
        type: "date",
        nullable: false
    })
    date: Date;

    constructor(player: Player, matchID: string, ACS: number, kills: number, deaths: number, assists: number, DD: number, ADR: number, HS: number, agent: string,  map: string, mode: string, won: boolean, side: string, date: Date){
        this.player = player;
        this.matchID = matchID;
        this.ACS = ACS;
        this.kills = kills;
        this.deaths = deaths;
        this.assists = assists;
        this.DD = DD;
        this.ADR = ADR;
        this.HS = HS;
        this.agent = agent;
        this.map = map;
        this.mode = mode;
        this.won = won;
        this.side = side;
        this.date = date;
    }
}
