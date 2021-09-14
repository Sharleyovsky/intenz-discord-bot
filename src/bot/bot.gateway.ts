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
import axios from 'axios';
import { ServerData } from '../interfaces/ServerData';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Status } from '../interfaces/Status';

@Injectable()
export class BotGateway {
  private readonly url = process.env.API_ENDPOINT;
  private readonly logger = new Logger(BotGateway.name);
  constructor(private readonly discordProvider: DiscordClientProvider) {}

  @Cron(CronExpression.EVERY_MINUTE)
  async editBotActivity() {
    try {
      const serverData = await this.getServerData();
      const activityStatus = this.getActivityStatus(serverData);
      this.discordProvider.getClient().user.setActivity(activityStatus);
    } catch (error) {
      this.logger.error(error);
    }
  }

  getRandomInt(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }

  async sleep(ms: number): Promise<number> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  getActivityStatus(serverData: ServerData): string {
    const { f42e9fc96a44d66055794c1e7c5ba4b0a13a8196, errorMessage } =
      serverData;

    const { status, environment } = f42e9fc96a44d66055794c1e7c5ba4b0a13a8196;

    if (typeof errorMessage === 'string') {
      throw new Error(errorMessage);
    }

    return `${this.getPlayersOnline(status)} ${environment.time}`;
  }

  getPlayersOnline({ players, queue, slots }: Status): string {
    if (queue.active) {
      return `${players} + ${queue.size}/${slots}`;
    }

    return `${players}/${slots}`;
  }

  async getServerData(): Promise<ServerData | null> {
    try {
      const { data } = await axios.get(this.url);
      return data;
    } catch (error) {
      this.logger.error(error);
      return null;
    }
  }

  getGuild(name: string): Guild | null {
    try {
      const guild = this.discordProvider
        .getClient()
        .guilds.cache.find(
          (guild) => guild.name.toLowerCase() === name.toLowerCase(),
        );

      if (!guild) {
        throw new Error(`Guild ${name} not found!`);
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

      const channel = channels.find(
        (channel) => channel.name.toLowerCase() === name.toLowerCase(),
      );

      if (!channel) {
        throw new Error(`Channel ${name} not found!`);
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
