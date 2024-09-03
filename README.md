
<br />
<div align="center">
  <a href="https://Valographs.com">
    <img src='https://github.com/user-attachments/assets/b219ac30-3fce-459c-9fdc-8e027debbdc7' height='40' width='40'>
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

<img src='https://github.com/user-attachments/assets/1f284bd9-cb90-4b13-8087-dd85a4480df4'></img>
*Graph Page Desktop View*

<img src='https://github.com/user-attachments/assets/2eb82719-7463-4b22-9c37-7f76d6af804b'></img>
*Profile Page Desktop View*

<img src='https://github.com/user-attachments/assets/8e68be93-91ed-4c1e-a98e-ae2d1013db34' width="auto" height="500"></img>

*Graph Page Mobile View*

<img src='https://github.com/user-attachments/assets/65b598e8-e2cf-4312-ae90-edc61489301b' width="auto" height="500"></img>

*Profile Page Mobile View*

## Contact

Jeffery Fang - JefferyFang02@gmail.com

## Tools & Technologies

- Postgres
- Express
- React
- Node
- Jest
- Vite
- Bootstrap
- AWS(Elastic Beanstalk, RDS, CloudFront, etc.)
