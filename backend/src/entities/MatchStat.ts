import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm'
import { Player } from './Player.js'

@Entity()
export class MatchStat {
    @PrimaryColumn({
        type: 'varchar',
        length: 36,
        nullable: false,
    })
    match_id: string

    @PrimaryColumn({
        type: 'varchar',
        length: 36,
        nullable: false,
    })
    player_id!: string

    @JoinColumn({
        name: 'player_id',
    })
    @ManyToOne(() => Player, {
        cascade: true,
    })
    player: Player

    @Column({
        type: 'float',
        nullable: false,
    })
    acs: number

    @Column({
        type: 'int',
        nullable: false,
    })
    kills: number

    @Column({
        type: 'int',
        nullable: false,
    })
    deaths: number

    @Column({
        type: 'int',
        nullable: false,
    })
    assists: number

    @Column({
        type: 'float',
        nullable: false,
    })
    dd: number

    @Column({
        type: 'float',
        nullable: false,
    })
    adr: number

    @Column({
        type: 'float',
        nullable: false,
    })
    hs: number

    @Column({
        type: 'varchar',
        length: 30,
        nullable: false,
    })
    agent: string

    @Column({
        type: 'varchar',
        length: 30,
        nullable: false,
    })
    map: string

    @Column({
        type: 'varchar',
        length: 30,
        nullable: false,
    })
    mode: string

    @Column({
        type: 'boolean',
        nullable: false,
    })
    won: boolean

    @Column({
        type: 'varchar',
        length: 4,
        nullable: false,
    })
    side: string

    @Column({
        type: 'date',
        nullable: false,
    })
    date: Date

    constructor(
        player: Player,
        matchID: string,
        ACS: number,
        kills: number,
        deaths: number,
        assists: number,
        DD: number,
        ADR: number,
        HS: number,
        agent: string,
        map: string,
        mode: string,
        won: boolean,
        side: string,
        date: Date
    ) {
        this.player = player
        this.match_id = matchID
        this.acs = ACS
        this.kills = kills
        this.deaths = deaths
        this.assists = assists
        this.dd = DD
        this.adr = ADR
        this.hs = HS
        this.agent = agent
        this.map = map
        this.mode = mode
        this.won = won
        this.side = side
        this.date = date
    }
}
