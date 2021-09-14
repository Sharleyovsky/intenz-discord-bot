import { Module } from '@nestjs/common';
import { DiscordModule } from 'discord-nestjs';
import { BotConfig } from './bot-config';
import { BotGateway } from './bot.gateway';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    DiscordModule.forRootAsync({ useClass: BotConfig }),
    ScheduleModule.forRoot(),
  ],
  providers: [BotGateway],
})
export class BotModule {}
