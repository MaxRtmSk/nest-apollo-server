import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class UsersService {
  private client;

  constructor() {
    this.client = axios.create({
      baseURL: process.env.USERS_URL,
    });
  }

  async findOneById(id: string): Promise<any> {
    try {
      const { data } = await this.client.get(`/${id}`);
      return data;
    } catch (e) {
      return e;
    }
  }

  async login(email: string, password: string): Promise<any> {
    try {
      const { data } = await this.client.post(`/login`, {
        email,
        password,
      });
      return data;
    } catch (e) {
      console.log(e);
      return e;
    }
  }

  async register(args: any): Promise<any> {
    const { firstName, lastName, password, email, favouriteArtistIds } = args;
    try {
      const { data } = await this.client.post(`/register`, {
        firstName,
        lastName,
        password,
        email,
        favouriteArtistIds,
      });
      return { ...data, id: data._id };
    } catch (e) {
      console.log(e);
      return e;
    }
  }
}
