var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import express from 'express';
import 'dotenv/config';
import { getPlayersFromMatchId } from '../services/matchStatServices.js';
const router = express.Router();
/**
 * Route that given a match_id will return a list of MatchStats associated with
 * that match
 */
router.get('/:match_id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield getPlayersFromMatchId(req.params.match_id);
        if (response === undefined) {
            throw 'Error retrieving match stats from the database';
        }
        res.status(200).json(response);
    }
    catch (err) {
        res.status(400).json({ error: err });
    }
}));
export default router;
