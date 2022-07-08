import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class TracksService {
  private client;

  constructor() {
    this.client = axios.create({
      baseURL: process.env.TRACKS_URL,
    });
  }

  async findOneById(id: string): Promise<any> {
    try {
      const result = await this.client.get(`/${id}`);
      return result.data;
    } catch (e) {
      return e;
    }
  }
}
