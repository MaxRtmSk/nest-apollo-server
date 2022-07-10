import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class FavouritesService {
  private client;

  constructor() {
    this.client = axios.create({
      baseURL: process.env.FAVOURITES_URL,
    });
  }

  async getFavourites(token): Promise<any> {
    try {
      const { data } = await this.client.get(
        '/',
        {},
        {
          headers: { Authorization: token },
        },
      );

      return data;
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


}
