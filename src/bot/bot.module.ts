import { Module } from '@nestjs/common';
import { DiscordModule } from '@discord-nestjs/core';
import { BotGateway } from './bot.gateway';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [DiscordModule.forFeature(), ScheduleModule.forRoot()],
  providers: [BotGateway],
})
export class BotModule {}
