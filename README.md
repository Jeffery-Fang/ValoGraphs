<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://Valographs.com">
    <svg stroke="black" fill="#FF4655" stroke-width="0" role="img" viewBox="0 0 24 24" class="text-danger" height="45" width="45" xmlns="http://www.w3.org/2000/svg"><path d="M23.792 2.152a.252.252 0 0 0-.098.083c-3.384 4.23-6.769 8.46-10.15 12.69-.107.093-.025.288.119.265 2.439.003 4.877 0 7.316.001a.66.66 0 0 0 .552-.25c.774-.967 1.55-1.934 2.324-2.903a.72.72 0 0 0 .144-.49c-.002-3.077 0-6.153-.003-9.23.016-.11-.1-.206-.204-.167zM.077 2.166c-.077.038-.074.132-.076.205.002 3.074.001 6.15.001 9.225a.679.679 0 0 0 .158.463l7.64 9.55c.12.152.308.25.505.247 2.455 0 4.91.003 7.365 0 .142.02.222-.174.116-.265C10.661 15.176 5.526 8.766.4 2.35c-.08-.094-.174-.272-.322-.184z"></path></svg>
  </a>

  <h3 align="center">ValoGraphs</h3>
  <p align="center">
    A performance visualization platform for Valorant
    <br />
  </p>
</div>

## About The Project

While there are other platforms to track Valorant performance, I have yet to find one that lets you one-to-one compare with other players. I wanted to be able to easily compare my performance with others without the need to swap between multiple profile pages so I created ValoGraphs. Click the icon to check it out or visit [valographs.com](https://valographs.com)!

## Getting Started

To get a local version running follow these simple example steps:

### Prerequisites

-   Create a Postgres database locally or from a cloud provider like Amazon RDS
-   Get a HenrikDev API key for the unofficial Valorant API. Instruction can be found at https://github.com/Henrik-3/unofficial-valorant-api

### Installation

Now once the prerequisites are met there just follow the steps below.

1. Clone the repository

    ```sh
    git clone https://github.com/Jeffery-Fang/ValoGraphs.git
    ```

2. Install NPM packages in the frontend and backend directories

    ```sh
    npm install
    ```

3. Create a `.env` file in the backend directory with the following environment variables

    ```js
    PLAYER_URL_ROOT = 'https://api.henrikdev.xyz/valorant/v4/matches/na/pc/'
    PROFILE_URL_ROOT = 'https://api.henrikdev.xyz/valorant/v1/stored-matches/na/'
    MATCH_URL_ROOT = 'https://api.henrikdev.xyz/valorant/v4/match/na/'

    DB_HOST = 'YOUR DB HOST'
    DB_USERNAME = 'YOUR DB USERNAME'
    DB_PASSWORD = 'YOUR DB PASSWORD'
    DB_NAME = 'YOUR DB NAME'

    API_KEY = 'YOUR API KEY'
    ```

4. Create a `.env` file in the frontend directory with the following environment variables

    ```js
    VITE_PLAYER_API_URL = 'http://localhost:3000/players/'
    VITE_MATCH_API_URL = 'http://localhost:3000/matches/'
    VITE_PROFILE_API_URL = 'http://localhost:3000/profiles/'
    ```

5. Go into the backend and frontend directories and start the development servers

    ```sh
    npm run dev
    ```

6. In the console where frontend development server was started type 'o' and 'enter' to open a tab with the client

### Gallery & Demonstrations
