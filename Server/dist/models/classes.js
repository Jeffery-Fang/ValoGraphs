export class matchStat {
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
