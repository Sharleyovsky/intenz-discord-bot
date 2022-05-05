## Description

Discord bot developed for [Dayz Intenz](https://dayzintenz.com/) discord server.

## Installation

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
#Start by installing packages
$ yarn install

# development
$ yarn start

# watch mode
$ yarn start:dev

# production mode
$ yarn build
$ yarn start:prod
```
