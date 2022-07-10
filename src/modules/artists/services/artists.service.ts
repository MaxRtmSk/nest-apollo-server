import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class ArtistsService {
  private client;

  constructor() {
    this.client = axios.create({
      baseURL: process.env.ARTISTS_URL,
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

  async findAll(): Promise<any> {
    try {
      const result = await this.client.get();
      return result.data.items;
    } catch (e) {
      console.log(e);
      return e;
    }
  }
}
