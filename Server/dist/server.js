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
const apiRootURL = "https://api.henrikdev.xyz/valorant/v4/matches/na/pc";
const apiKey = process.env.API_KEY;
const app = express();
const PORT = 3000;
class matchStat {
    constructor(playerData, matchID, map, mode, won, numRounds, date) {
        this.playerID = playerData["puuid"];
        this.matchID = matchID;
        this.ACS = Number((playerData["stats"]["score"] / numRounds).toFixed(2));
        this.kills = playerData["stats"]["kills"];
        this.deaths = playerData["stats"]["deaths"];
        this.assists = playerData["stats"]["assists"];
        this.DD = Number(((playerData["stats"]["damage"]["dealt"] - playerData["stats"]["damage"]["received"]) / numRounds).toFixed(2));
        this.ADR = Number((playerData["stats"]["damage"]["dealt"] / numRounds).toFixed(2));
        this.HS = Math.round((playerData["stats"]["headshots"] / (playerData["stats"]["headshots"] + playerData["stats"]["bodyshots"] + playerData["stats"]["legshots"]) * 100));
        this.agent = playerData["agent"]["name"];
        this.map = map;
        this.mode = mode;
        this.won = won;
        this.side = playerData["team_id"];
        this.date = date;
    }
}
app.get('/user/:name', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.params.name == undefined || req.query.tag == undefined || req.query.mode == undefined || req.query.size == undefined) {
            throw "invalid input";
        }
        let name = req.params.name;
        let tag = req.query.tag;
        let mode = (["unrated", "competitive", "teamdeathmatch"].includes(req.query.mode)) ? req.query.mode : "competitive";
        let size = (Number(req.query.size) < 10 && Number(req.query.size) > 0) ? Number(req.query.size) : 5;
        let url = apiRootURL + "/" + name + "/" + tag + "?mode=" + mode + "&size=" + size;
        let options = {
            method: 'GET',
            headers: {
                'Authorization': apiKey
            }
        };
        console.log(url);
        const response = yield (yield fetch(url, options)).json();
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
        out.sort((a, b) => b.date.getTime() - a.date.getTime());
        res.status(200).send(out);
    }
    catch (err) {
        res.status(400).json({ error: err });
    }
}));
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
