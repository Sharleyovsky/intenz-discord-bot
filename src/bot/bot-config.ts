import { Injectable } from '@nestjs/common';
import { DiscordModuleOption, DiscordOptionsFactory } from 'discord-nestjs';
import { Intents } from 'discord.js';

@Injectable()
export class BotConfig implements DiscordOptionsFactory {
  private readonly Intents = new Intents();

  createDiscordOptions(): DiscordModuleOption {
    this.Intents.add(
      Intents.FLAGS.GUILDS,
      Intents.FLAGS.GUILD_INTEGRATIONS,
      Intents.FLAGS.GUILD_MESSAGES,
      Intents.FLAGS.GUILD_INVITES,
    );
    return {
      intents: this.Intents,
      token: process.env.TOKEN,
      commandPrefix: '!',
    };
  }
}
