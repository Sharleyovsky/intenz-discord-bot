import { Injectable, Logger } from '@nestjs/common';
import { Once, DiscordClientProvider } from 'discord-nestjs';
import {
  CategoryChannel,
  Guild,
  NewsChannel,
  StageChannel,
  StoreChannel,
  TextChannel,
  VoiceChannel,
} from 'discord.js';

@Injectable()
export class BotGateway {
  private readonly logger = new Logger(BotGateway.name);
  constructor(private readonly discordProvider: DiscordClientProvider) {}

  getGuild(name: string): Guild | null {
    try {
      const [guild] = this.discordProvider
        .getClient()
        .guilds.cache.map(
          (guild) => guild.name.toLowerCase() === name.toLowerCase() && guild,
        );

      if (!guild) {
        throw new Error('Guild not found!');
      }

      return guild;
    } catch (error) {
      this.logger.error(error);
      return null;
    }
  }

  async getChannel(
    name: string,
  ): Promise<
    | TextChannel
    | VoiceChannel
    | CategoryChannel
    | NewsChannel
    | StoreChannel
    | StageChannel
    | null
  > {
    try {
      const guild = this.getGuild(process.env.SERVER_NAME);
      const channels = await guild.channels.fetch();

      const [channel] = channels.map(
        (channel) =>
          channel.name.toLowerCase() === name.toLowerCase() && channel,
      );

      if (!channel) {
        throw new Error('Channel not found!');
      }

      return channel;
    } catch (error) {
      this.logger.error(error);
      return null;
    }
  }

  @Once({ event: 'ready' })
  onReady(): void {
    this.logger.verbose(
      `Logged in as ${this.discordProvider.getClient().user.tag}!`,
    );
  }
}
