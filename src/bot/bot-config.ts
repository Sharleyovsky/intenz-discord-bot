import { Injectable } from '@nestjs/common';
import { DiscordModuleOption, DiscordOptionsFactory } from 'discord-nestjs';

@Injectable()
export class BotConfig implements DiscordOptionsFactory {
  createDiscordOptions(): DiscordModuleOption {
    return {
      intents: null,
      token: 'Njg2MzI2OTMwNTg4NTY1NTQx.XmVlww.EF_bMXRvYgMUCQhg_jYnieoBW-k',
      commandPrefix: '!',
    };
  }
}
