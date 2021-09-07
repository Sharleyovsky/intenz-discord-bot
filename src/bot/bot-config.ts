import { Injectable } from '@nestjs/common';
import { DiscordModuleOption, DiscordOptionsFactory } from 'discord-nestjs';

@Injectable()
export class BotConfig implements DiscordOptionsFactory {
  createDiscordOptions(): DiscordModuleOption {
    return {
      intents: null,
      token: process.env.TOKEN,
      commandPrefix: '!',
    };
  }
}
