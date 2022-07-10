import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class AlbumsService {
  private client;

  constructor() {
    this.client = axios.create({
      baseURL: process.env.ALBUMS_URL,
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
        data.items.map((album) => {
          return { ...album, id: album._id };
        }),
      );

      return { ...data, items };
    } catch (e) {
      console.log(e);
      return e;
    }
  }

  async create(album, token): Promise<any> {
    try {
      const { data } = await this.client.post(
        '/',
        {
          ...album,
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

  async update(id, album, token): Promise<any> {
    try {
      const { data } = await this.client.put(
        `/${id}`,
        {
          ...album,
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
