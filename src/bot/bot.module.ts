import { Module } from '@nestjs/common';
import { DiscordModule } from 'discord-nestjs';
import { BotConfig } from './bot-config';
import { BotGateway } from './bot.gateway';

@Module({
  imports: [DiscordModule.forRootAsync({ useClass: BotConfig })],
  providers: [BotGateway],
})
export class BotModule {}
