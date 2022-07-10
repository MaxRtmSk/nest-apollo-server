import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class GenresService {
  private client;

  constructor() {
    this.client = axios.create({
      baseURL: process.env.GENRES_URL,
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

      const result = await Promise.all(
        data.items.map((genre) => {
          return { ...genre, id: genre._id };
        }),
      );

      return result;
    } catch (e) {
      console.log(e);
      return e;
    }
  }

  async create(genre, token): Promise<any> {
    try {
      const { data } = await this.client.post(
        '/',
        {
          ...genre,
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

  async update(id, genre, token): Promise<any> {
    try {
      const { data } = await this.client.put(
        `/${id}`,
        {
          ...genre,
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
