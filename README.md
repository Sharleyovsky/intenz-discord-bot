## Description

Discord bot developed for [Dayz Intenz](https://dayzintenz.com/) discord server.

## Installation (Skip this part if you are using docker)

```bash
$ yarn install
```

## Running the app

You need to set two environmental variables before running the app
```bigquery
TOKEN = DISCORD BOT AUTHENTICATION TOKEN
API_ENDPOINT = API ENDPOINT (default: https://dayzintenz.com/api/dayzsa/CfServerInfo)
```

Run commands below to start the app.
```bash
# development
$ yarn start

# watch mode
$ yarn start:dev

# production mode
$ yarn build
$ yarn start:prod
```

##Running the app with docker
```bash
TOKEN=YOUR_DISCORD_TOKEN API_ENDPOINT=https://dayzintenz.com/api/dayzsa/CfServerInfo docker compose up -d --build
```
