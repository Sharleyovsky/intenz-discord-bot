import { Module } from '@nestjs/common';
import { BotModule } from './bot/bot.module';
import { BotGateway } from './bot.gateway';

@Module({
  imports: [BotModule],
  controllers: [],
  providers: [BotGateway],
})
export class AppModule {}
