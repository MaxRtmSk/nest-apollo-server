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

  findOneById(id: string): any {
    return '[]';
  }
}
