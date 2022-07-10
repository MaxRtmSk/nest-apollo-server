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
      const { data } = await this.client.get(`/${id}`);
      return { data, id: data._id };
    } catch (e) {
      return e;
    }
  }

  async findAll(): Promise<any> {
    try {
      const { data } = await this.client.get();

      const result = await Promise.all(
        data.items.map((album) => {
          return { ...album, id: album._id };
        }),
      );

      return result;
    } catch (e) {
      console.log(e);
      return e;
    }
  }
}
