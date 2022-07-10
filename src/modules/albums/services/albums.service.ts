import { Injectable } from "@nestjs/common";
import axios from "axios";
import { Args, Mutation } from "@nestjs/graphql";
import { RegisterInput } from "../../users/dto/register.input";

@Injectable()
export class AlbumsService {
  private client;

  constructor() {
    this.client = axios.create({
      baseURL: process.env.ALBUMS_URL
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
