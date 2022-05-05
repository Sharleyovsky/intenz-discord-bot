import { Injectable, Logger } from '@nestjs/common';
import { Once, InjectDiscordClient } from '@discord-nestjs/core';
import { Client } from 'discord.js';
import axios from 'axios';
import { ServerData } from '../interfaces/ServerData';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Status } from '../interfaces/Status';

@Injectable()
export class BotGateway {
  private readonly url = process.env.API_ENDPOINT;
  private readonly logger = new Logger(BotGateway.name);
  constructor(
    @InjectDiscordClient()
    private readonly client: Client,
  ) {}

  @Cron(CronExpression.EVERY_30_SECONDS)
  async editBotActivity() {
    try {
      const serverData = await this.getServerData();
      const activityStatus = this.getActivityStatus(serverData);
      this.client.user.setActivity(activityStatus);
    } catch (error) {
      this.logger.error(error);
    }
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

  @Once('ready')
  onReady(): void {
    this.logger.verbose(`Logged in as ${this.client.user.tag}!`);
  }
}
