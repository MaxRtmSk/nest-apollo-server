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
      const { data } = await this.client.get(`/${id}`);
      return { ...data, id: data._id };
    } catch (e) {
      return e;
    }
  }

  async findAll(limit, offset): Promise<any> {
    try {
      const { data } = await this.client.get('/', {
        params: {
          limit,
          offset,
        },
      });

      const items = await Promise.all(
        data.items.map((artist) => {
          return { ...artist, id: artist._id };
        }),
      );

      return { ...data, items };
    } catch (e) {
      console.log(e);
      return e;
    }
  }

  async create(artist, token): Promise<any> {
    try {
      const { data } = await this.client.post(
        '/',
        {
          ...artist,
        },
        {
          headers: { Authorization: token },
        },
      );
      return { ...data, id: data._id };
    } catch (e) {
      console.log(e.message);
      return e;
    }
  }

  async update(id, artist, token): Promise<any> {
    try {
      const { data } = await this.client.put(
        `/${id}`,
        {
          ...artist,
        },
        {
          headers: { Authorization: token },
        },
      );
      return { ...data, id: data._id };
    } catch (e) {
      console.log(e.message);
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
