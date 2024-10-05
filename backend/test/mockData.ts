import { MatchStat } from '../src/entities/MatchStat'
import { Player } from '../src/entities/Player'

export const mockMatchStat: MatchStat = {
    player: new Player('f92dd35a-65f3-51fe-9eeb-37585f351587', 'yay', '667'),
    match_id: 'b5435599-43af-48dd-b0ba-032260200f25',
    acs: 427.13,
    kills: 36,
    deaths: 15,
    assists: 4,
    dd: 149.22,
    adr: 274.7,
    hs: 54,
    agent: 'Cypher',
    map: 'Sunset',
    mode: 'Competitive',
    won: false,
    rounds_blue_won: 13,
    rounds_red_won: 10,
    side: 'Red',
    date: new Date('2024-08-26'),
    agent_id: '117ed9e3-49f3-6512-3ccf-0cada7e3823b',
    card_id: 'a6d48dd0-40eb-e2f0-d862-219df87a9583',
    player_id: 'f92dd35a-65f3-51fe-9eeb-37585f351587',
}

export const mockPackagedData = {
    playerData: {
        puuid: 'f92dd35a-65f3-51fe-9eeb-37585f351587',
        name: 'yay',
        tag: '667',
        stats: {
            score: 9824,
            kills: 36,
            deaths: 15,
            assists: 4,
            headshots: 34,
            bodyshots: 24,
            legshots: 5,
            damage: {
                dealt: 6318,
                received: 2886,
            },
        },
        agent: {
            id: '117ed9e3-49f3-6512-3ccf-0cada7e3823b',
            name: 'Cypher',
        },
        customization: {
            card: 'a6d48dd0-40eb-e2f0-d862-219df87a9583',
        },
        team_id: 'Red',
    },
    match_id: 'b5435599-43af-48dd-b0ba-032260200f25',
    map: 'Sunset',
    mode: 'Competitive',
    won: false,
    rounds_blue_won: 13,
    rounds_red_won: 10,
    numRounds: 23,
    date: new Date(),
}

export const mockPlayerApiResponse = [
    {
        metadata: {
            match_id: ' e5467da1-f1d3-4a49-bebc-f790b0f34959',
            map: {
                name: 'Fracture',
            },
            queue: {
                name: 'unrated',
            },
        },
        players: [
            {
                puuid: '8918b04d-9034-5838-b3ed-dd7ae3efe5e5',
                name: 'Hexennacht',
                tag: 'NA1',
                team_id: 'Blue',
            },
        ],
        teams: [
            {
                team_id: 'Red',
                rounds: {
                    won: 4,
                    lost: 13,
                },
                won: true,
                premier_roster: null,
            },
        ],
        rounds: [
            {
                result: 'Elimination',
            },
        ],
    },
    {
        metadata: {
            match_id: ' e5467da1-f1d3-4a49-bebc-f790b0f34959',
            map: {
                name: 'Fracture',
            },
            queue: {
                name: 'unrated',
            },
        },
        players: [
            {
                puuid: '8918b04d-9034-5838-b3ed-dd7ae3efe5e5',
                name: 'Hexennacht',
                tag: 'NA1',
                team_id: 'Blue',
            },
        ],
        teams: [
            {
                team_id: 'Blue',
                rounds: {
                    won: 4,
                    lost: 13,
                },
                won: true,
                premier_roster: null,
            },
        ],
        rounds: [
            {
                result: 'Elimination',
            },
        ],
    },
]

export const mockProfileApiResponse = [
    {
        meta: {
            id: '5de6fe7f-fa17-42f5-aa50-d80da2b0684e',
            map: {
                id: 'e2ad5c54-4114-a870-9641-8ea21279579a',
                name: 'Icebox',
            },
            version: 'release-09.03-shipping-14-2707123',
            mode: 'Competitive',
            started_at: '2024-08-27T06:04:36.543Z',
            season: {
                id: '52ca6698-41c1-e7de-4008-8994d2221209',
                short: 'e9a1',
            },
            region: 'na',
            cluster: 'US Central (Illinois)',
        },
        stats: {
            puuid: 'f92dd35a-65f3-51fe-9eeb-37585f351587',
            team: 'Blue',
            level: 464,
            character: {
                id: '1e58de9c-4950-5125-93e9-a0aee9f98746',
                name: 'Killjoy',
            },
            tier: 27,
            score: 5753,
            kills: 20,
            deaths: 16,
            assists: 2,
            shots: {
                head: 19,
                body: 28,
                leg: 0,
            },
            damage: {
                made: 3815,
                received: 2735,
            },
        },
        teams: {
            red: 12,
            blue: 14,
        },
    },
    {
        meta: {
            id: '5de6fe7f-fa17-42f5-aa50-d80da2b0684e',
            map: {
                id: 'e2ad5c54-4114-a870-9641-8ea21279579a',
                name: 'Icebox',
            },
            version: 'release-09.03-shipping-14-2707123',
            mode: 'Competitive',
            started_at: '2024-08-27T06:04:36.543Z',
            season: {
                id: '52ca6698-41c1-e7de-4008-8994d2221209',
                short: 'e9a1',
            },
            region: 'na',
            cluster: 'US Central (Illinois)',
        },
        stats: {
            puuid: 'f92dd35a-65f3-51fe-9eeb-37585f351587',
            team: 'Red',
            level: 464,
            character: {
                id: '1e58de9c-4950-5125-93e9-a0aee9f98746',
                name: 'Killjoy',
            },
            tier: 27,
            score: 5753,
            kills: 20,
            deaths: 16,
            assists: 2,
            shots: {
                head: 19,
                body: 28,
                leg: 0,
            },
            damage: {
                made: 3815,
                received: 2735,
            },
        },
        teams: {
            red: 14,
            blue: 12,
        },
    },
]

export const mockMatchApiResponses = [
    {
        metadata: {
            match_id: ' e5467da1-f1d3-4a49-bebc-f790b0f34959',
            map: {
                name: 'Fracture',
            },
            queue: {
                name: 'unrated',
            },
        },
        players: [
            {
                puuid: '8918b04d-9034-5838-b3ed-dd7ae3efe5e5',
                name: 'Hexennacht',
                tag: 'NA1',
                team_id: 'Blue',
            },
            {
                puuid: '8918b04d-9034-5838-b3ed-dd7ae3efe5e5',
                name: 'Hexennacht',
                tag: 'NA1',
                team_id: 'Red',
            },
        ],
        teams: [
            {
                team_id: 'Red',
                rounds: {
                    won: 4,
                    lost: 13,
                },
                won: true,
                premier_roster: null,
            },
        ],
        rounds: [
            {
                result: 'Elimination',
            },
        ],
    },
    {
        metadata: {
            match_id: ' e5467da1-f1d3-4a49-bebc-f790b0f34959',
            map: {
                name: 'Fracture',
            },
            queue: {
                name: 'unrated',
            },
        },
        players: [
            {
                puuid: '8918b04d-9034-5838-b3ed-dd7ae3efe5e5',
                name: 'Hexennacht',
                tag: 'NA1',
                team_id: 'Blue',
            },
            {
                puuid: '8918b04d-9034-5838-b3ed-dd7ae3efe5e5',
                name: 'Hexennacht',
                tag: 'NA1',
                team_id: 'Red',
            },
        ],
        teams: [
            {
                team_id: 'Blue',
                rounds: {
                    won: 4,
                    lost: 13,
                },
                won: true,
                premier_roster: null,
            },
        ],
        rounds: [
            {
                result: 'Elimination',
            },
        ],
    },
]
