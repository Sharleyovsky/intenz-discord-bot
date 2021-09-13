import { Injectable, Logger } from '@nestjs/common';
import { Once, DiscordClientProvider } from 'discord-nestjs';

@Injectable()
export class BotGateway {
  private readonly logger = new Logger(BotGateway.name);
  constructor(private readonly discordProvider: DiscordClientProvider) {}

  @Once({ event: 'ready' })
  async onReady(): Promise<void> {
    this.logger.verbose(
      `Logged in as ${this.discordProvider.getClient().user.tag}!`,
    );
  }
}
