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
import { matchStat } from '../models/classes.js';
const userUrlRoot = process.env.USER_URL_ROOT;
const apiKey = process.env.API_KEY;
const router = express.Router();
router.get('/:name', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.params.name == undefined || req.query.tag == undefined || req.query.mode == undefined || req.query.size == undefined) {
            throw "invalid input";
        }
        let name = req.params.name;
        let tag = req.query.tag;
        let mode = (["unrated", "competitive", "teamdeathmatch"].includes(req.query.mode)) ? req.query.mode : "competitive";
        let size = (Number(req.query.size) < 10 && Number(req.query.size) > 0) ? Number(req.query.size) : 5;
        let url = userUrlRoot + "/" + name + "/" + tag + "?mode=" + mode + "&size=" + size;
        let options = {
            method: 'GET',
            headers: {
                'Authorization': apiKey
            }
        };
        console.log(url);
        const response = yield (yield fetch(url, options)).json();
        if (response == undefined) {
            throw "no response from henrikdev API";
        }
        if (Object.keys(response).includes('errors')) {
            throw response.errors;
        }
        const out = [];
        for (let match of response["data"]) {
            for (let playerData of match["players"]) {
                let won = false;
                let numRounds = 0;
                for (let team of match["teams"]) {
                    if (playerData["team_id"] == team["team_id"]) {
                        won = team["won"];
                    }
                }
                for (let round of match["rounds"]) {
                    if (round["result"] != "Surrendered") {
                        numRounds += 1;
                    }
                }
                let player = new matchStat(playerData, match["metadata"]["match_id"], match["metadata"]["map"]["name"], match["metadata"]["queue"]["name"], won, numRounds, new Date(match["metadata"]["started_at"]));
                // out.push([
                //     playerData.name,
                //     player
                // ]);
                if (playerData.name == name) {
                    out.push(player);
                }
            }
        }
        //out.sort((a: matchStat, b: matchStat): number => b.date.getTime() - a.date.getTime());
        res.status(200).send(out);
    }
    catch (err) {
        res.status(400).json({ error: err });
    }
}));
export default router;
