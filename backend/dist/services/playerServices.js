var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Player } from '../entities/Player.js';
import { AppDataSource } from '../data-source.js';
export function createOnePlayer(playerID, playerName, playerTag) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const player = new Player(playerID, playerName, playerTag);
            const playerRepository = AppDataSource.getRepository(Player);
            yield playerRepository.save(player);
            return player;
        }
        catch (err) {
            console.log('Error creating a Player', err);
            return createDummyPlayer();
        }
    });
}
export function createManyPlayer(players) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const playerRepository = AppDataSource.getRepository(Player);
            yield playerRepository.createQueryBuilder().insert().into(Player).values(players).orIgnore().execute();
            return players;
        }
        catch (err) {
            console.log('Error creating a Player', err);
            return [createDummyPlayer()];
        }
    });
}
export function getIdFromNameTag(playerName, playerTag) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const playerRepository = AppDataSource.getRepository(Player);
            const player = (yield playerRepository.findOneBy({
                name: playerName,
                tag: playerTag,
            })) || createDummyPlayer();
            return player.id;
        }
        catch (err) {
            console.log('Error getting Id from name + tag', err);
            return createDummyPlayer().id;
        }
    });
}
export function createDummyPlayer() {
    const dummy = new Player('dummy_player_id', 'dummy_player_name', 'dummy_player_tag');
    return dummy;
}
