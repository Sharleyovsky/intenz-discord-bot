## Description

Discord bot developed for [Dayz Intenz](https://dayzintenz.com/) discord server.

## Installation

```bash
$ yarn install
```

## Running the app

You need to set three environmental variables before running the app.
```bigquery
TOKEN = DISCORD BOT AUTHENTICATION TOKEN
SERVER_NAME = YOUR DISCORD SERVER NAME
API_ENDPOINT = API ENDPOINT (default: https://dayzintenz.com/api/dayzsa/CfServerInfo)
```

Create channel on discord with the value of channelData.txt file and run commands below.

```bash
# development
$ yarn start

# watch mode
$ yarn start:dev

# production mode
$ yarn start:prod
```
