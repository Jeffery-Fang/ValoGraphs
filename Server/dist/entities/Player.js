var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm';
import { MatchStat } from './MatchStat.js';
let Player = class Player {
    constructor(playerID, name, tag) {
        this.id = playerID;
        this.name = name;
        this.tag = tag;
    }
};
__decorate([
    PrimaryColumn({
        type: 'varchar',
        length: 36,
        nullable: false,
    }),
    __metadata("design:type", String)
], Player.prototype, "id", void 0);
__decorate([
    Column({
        type: 'varchar',
        length: 36,
        nullable: false,
    }),
    __metadata("design:type", String)
], Player.prototype, "name", void 0);
__decorate([
    Column({
        type: 'varchar',
        length: 10,
        nullable: false,
    }),
    __metadata("design:type", String)
], Player.prototype, "tag", void 0);
__decorate([
    OneToMany(() => MatchStat, (match) => match.player),
    __metadata("design:type", Array)
], Player.prototype, "matches", void 0);
Player = __decorate([
    Entity(),
    __metadata("design:paramtypes", [String, String, String])
], Player);
export { Player };
