import { Module } from '@nestjs/common';
import { DiscordModule } from '@discord-nestjs/core';
import { Intents } from 'discord.js';

@Module({
  imports: [
    DiscordModule.forRootAsync({
      useFactory: () => ({
        token: process.env.TOKEN,
        discordClientOptions: {
          intents: [
            Intents.FLAGS.GUILDS,
            Intents.FLAGS.GUILD_INTEGRATIONS,
            Intents.FLAGS.GUILD_MESSAGES,
            Intents.FLAGS.GUILD_INVITES,
          ],
        },
      }),
    }),
  ],
  controllers: [],
})
export class AppModule {}
