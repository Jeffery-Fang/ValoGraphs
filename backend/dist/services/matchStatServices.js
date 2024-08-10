var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { AppDataSource } from '../data-source.js';
import { MatchStat } from '../entities/MatchStat.js';
import { Player } from '../entities/Player.js';
import { createDummyPlayer } from './playerServices.js';
export function createOneMatchStat(playerData, match_id, map, mode, won, numRounds, date) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const matchStat = new MatchStat(new Player(playerData['puuid'], playerData['name'], playerData['tag']), match_id, Number((playerData['stats']['score'] / numRounds).toFixed(2)), playerData['stats']['kills'], playerData['stats']['deaths'], playerData['stats']['assists'], Number(((playerData['stats']['damage']['dealt'] - playerData['stats']['damage']['received']) /
                numRounds).toFixed(2)), Number((playerData['stats']['damage']['dealt'] / numRounds).toFixed(2)), Math.round((playerData['stats']['headshots'] /
                (playerData['stats']['headshots'] +
                    playerData['stats']['bodyshots'] +
                    playerData['stats']['legshots'])) *
                100), playerData['agent']['name'], map, mode, won, playerData['team_id'], date);
            const matchStatRepository = AppDataSource.getRepository(MatchStat);
            yield matchStatRepository.save(matchStat);
            return matchStat;
        }
        catch (err) {
            console.log('Error creating a MatchStat', err);
            return createDummyMatchStat();
        }
    });
}
export function createManyMatchStat(packagedData) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let stats = [];
            for (let data of packagedData) {
                const matchStat = new MatchStat(new Player(data.playerData['puuid'], data.playerData['name'], data.playerData['tag']), data.match_id, Number((data.playerData['stats']['score'] / data.numRounds).toFixed(2)), data.playerData['stats']['kills'], data.playerData['stats']['deaths'], data.playerData['stats']['assists'], Number(((data.playerData['stats']['damage']['dealt'] - data.playerData['stats']['damage']['received']) /
                    data.numRounds).toFixed(2)), Number((data.playerData['stats']['damage']['dealt'] / data.numRounds).toFixed(2)), Math.round((data.playerData['stats']['headshots'] /
                    (data.playerData['stats']['headshots'] +
                        data.playerData['stats']['bodyshots'] +
                        data.playerData['stats']['legshots'])) *
                    100), data.playerData['agent']['name'], data.map, data.mode, data.won, data.playerData['team_id'], data.date);
                stats.push(matchStat);
            }
            const matchStatRepository = AppDataSource.getRepository(MatchStat);
            yield matchStatRepository.save(stats);
            stats.sort((a, b) => b.date.getTime() - a.date.getTime());
            return stats;
        }
        catch (err) {
            console.log('Error creating a MatchStat', err);
            return [createDummyMatchStat()];
        }
    });
}
export function getPlayersFromMatchId(match_id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const matchStatRepository = AppDataSource.getRepository(MatchStat);
            const players = (yield matchStatRepository.find({
                relations: {
                    player: true,
                },
                where: {
                    match_id: match_id,
                },
            })) || [];
            return players;
        }
        catch (err) {
            console.log('Error getting MatchStats', err);
            return [createDummyMatchStat()];
        }
    });
}
export function createDummyMatchStat() {
    const dummy = new MatchStat(createDummyPlayer(), 'dummy_match_id', -1, -1, -1, -1, -1, -1, -1, 'dummy_agent', 'dummy_map', 'dummy_mode', false, 'red', new Date());
    return dummy;
}
