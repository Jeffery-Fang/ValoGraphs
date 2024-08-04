import express, {Application, Request, Response} from 'express';
import 'dotenv/config';

const apiRootURL: string = "https://api.henrikdev.xyz/valorant/v4/matches/na/pc";
const apiKey: any = process.env.API_KEY;
const app: Application = express();
const PORT: number = 3000;

class matchStat{
    matchID: string;
    playerID: string;
    ACS: number;
    kills: number;
    deaths: number;
    assists: number;
    DD: number;
    ADR: number;
    HS: number;
    agent: string;
    map: string;
    mode: string;
    won: boolean;
    side: string;
    date: Date;

    constructor(playerData: any, matchID: string, map: string, mode: string, won: boolean, numRounds: number, date: Date){
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

app.get('/user/:name', async (req: Request, res: Response): Promise<void> => {
    try{
        if(req.params.name == undefined || req.query.tag == undefined || req.query.mode == undefined || req.query.size == undefined){
            throw "invalid input";
        }
        let name: string = <string> req.params.name;
        let tag: string = <string> req.query.tag;
        let mode: string = (["unrated", "competitive", "teamdeathmatch"].includes(<string> req.query.mode)) ? <string> req.query.mode : "competitive";
        let size: number = (Number(req.query.size) < 10 && Number(req.query.size) > 0) ? Number(req.query.size) : 5;

        let url: string = apiRootURL + "/" + name + "/" + tag + "?mode=" + mode + "&size=" + size as string; 
        let options: RequestInit = {
            method: 'GET',
            headers: {
                'Authorization': apiKey
            }
        };

        console.log(url);

        const response = await (await fetch(url, options)).json();

        if(Object.keys(response).includes('errors')){
            throw response.errors;
        }
        
        const out: matchStat[] = [];

        for(let match of response["data"]){
            for(let playerData of match["players"]){
                let won: boolean = false;
                let numRounds: number = 0;

                for(let team of match["teams"]){
                    if(playerData["team_id"] == team["team_id"]){
                        won = team["won"]
                    }
                }

                for(let round of match["rounds"]){
                    if(round["result"] != "Surrendered"){
                        numRounds += 1;
                    }
                }

                let player: matchStat = new matchStat(
                    playerData,
                    match["metadata"]["match_id"],
                    match["metadata"]["map"]["name"],
                    match["metadata"]["queue"]["name"],
                    won,
                    numRounds,
                    new Date(match["metadata"]["started_at"])
                );
                
                // out.push([
                //     playerData.name,
                //     player
                // ]);
                
                if(playerData.name == name){
                    out.push(player)
                }
            }     
        }
        
        out.sort((a: matchStat, b: matchStat): number => b.date.getTime() - a.date.getTime());

        res.status(200).send(out);
    }catch(err){
        res.status(400).json({error: err});
    }
});

app.listen(PORT, (): void => {
    console.log(`Server is running on http://localhost:${PORT}`);
});