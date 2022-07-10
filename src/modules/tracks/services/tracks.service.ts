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
      const { data } = await this.client.get(`/${id}`);
      return { ...data, id: data._id };
    } catch (e) {
      return e;
    }
  }

  async findAll(limit: number, offset: number): Promise<any> {
    try {
      const { data } = await this.client.get('/', {
        params: {
          limit,
          offset,
        },
      });

      const items = await Promise.all(
        data.items.map((track) => {
          return { ...track, id: track._id };
        }),
      );

      return { ...data, items };
    } catch (e) {
      console.log(e);
      return e;
    }
  }

  async create(track, token): Promise<any> {
    try {
      const { data } = await this.client.post(
        '/',
        {
          ...track,
        },
        {
          headers: { Authorization: token },
        },
      );
      return { ...data, id: data._id };
    } catch (e) {
      console.log(e);
      return e;
    }
  }

  async update(id, track, token): Promise<any> {
    try {
      const { data } = await this.client.put(
        `/${id}`,
        {
          ...track,
        },
        {
          headers: { Authorization: token },
        },
      );
      return { ...data, id: data._id };
    } catch (e) {
      console.log(e);
      return e;
    }
  }

  async delete(id, token): Promise<any> {
    try {
      const { data } = await this.client.delete(`/${id}`, {
        headers: { Authorization: token },
      });
      return data;
    } catch (e) {
      console.log(e);
      return e;
    }
  }
}
