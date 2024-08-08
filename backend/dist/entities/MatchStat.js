var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Player } from './Player.js';
let MatchStat = class MatchStat {
    constructor(player, matchID, ACS, kills, deaths, assists, DD, ADR, HS, agent, map, mode, won, side, date) {
        this.player = player;
        this.match_id = matchID;
        this.acs = ACS;
        this.kills = kills;
        this.deaths = deaths;
        this.assists = assists;
        this.dd = DD;
        this.adr = ADR;
        this.hs = HS;
        this.agent = agent;
        this.map = map;
        this.mode = mode;
        this.won = won;
        this.side = side;
        this.date = date;
    }
};
__decorate([
    PrimaryColumn({
        type: 'varchar',
        length: 36,
        nullable: false,
    }),
    __metadata("design:type", String)
], MatchStat.prototype, "match_id", void 0);
__decorate([
    PrimaryColumn({
        type: 'varchar',
        length: 36,
    }),
    __metadata("design:type", String)
], MatchStat.prototype, "player_id", void 0);
__decorate([
    JoinColumn({
        name: 'player_id',
    }),
    ManyToOne(() => Player, {
        cascade: true,
    }),
    __metadata("design:type", Player)
], MatchStat.prototype, "player", void 0);
__decorate([
    Column({
        type: 'float',
        nullable: false,
    }),
    __metadata("design:type", Number)
], MatchStat.prototype, "acs", void 0);
__decorate([
    Column({
        type: 'int',
        nullable: false,
    }),
    __metadata("design:type", Number)
], MatchStat.prototype, "kills", void 0);
__decorate([
    Column({
        type: 'int',
        nullable: false,
    }),
    __metadata("design:type", Number)
], MatchStat.prototype, "deaths", void 0);
__decorate([
    Column({
        type: 'int',
        nullable: false,
    }),
    __metadata("design:type", Number)
], MatchStat.prototype, "assists", void 0);
__decorate([
    Column({
        type: 'float',
        nullable: false,
    }),
    __metadata("design:type", Number)
], MatchStat.prototype, "dd", void 0);
__decorate([
    Column({
        type: 'float',
        nullable: false,
    }),
    __metadata("design:type", Number)
], MatchStat.prototype, "adr", void 0);
__decorate([
    Column({
        type: 'float',
        nullable: false,
    }),
    __metadata("design:type", Number)
], MatchStat.prototype, "hs", void 0);
__decorate([
    Column({
        type: 'varchar',
        length: 30,
        nullable: false,
    }),
    __metadata("design:type", String)
], MatchStat.prototype, "agent", void 0);
__decorate([
    Column({
        type: 'varchar',
        length: 30,
        nullable: false,
    }),
    __metadata("design:type", String)
], MatchStat.prototype, "map", void 0);
__decorate([
    Column({
        type: 'varchar',
        length: 30,
        nullable: false,
    }),
    __metadata("design:type", String)
], MatchStat.prototype, "mode", void 0);
__decorate([
    Column({
        type: 'boolean',
        nullable: false,
    }),
    __metadata("design:type", Boolean)
], MatchStat.prototype, "won", void 0);
__decorate([
    Column({
        type: 'varchar',
        length: 4,
        nullable: false,
    }),
    __metadata("design:type", String)
], MatchStat.prototype, "side", void 0);
__decorate([
    Column({
        type: 'date',
        nullable: false,
    }),
    __metadata("design:type", Date)
], MatchStat.prototype, "date", void 0);
MatchStat = __decorate([
    Entity(),
    __metadata("design:paramtypes", [Player, String, Number, Number, Number, Number, Number, Number, Number, String, String, String, Boolean, String, Date])
], MatchStat);
export { MatchStat };
