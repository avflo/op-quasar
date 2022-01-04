import { Injectable } from '@nestjs/common';

@Injectable()
export class SatelliteService {
  private name: string;
  private distance: number;
  private message: Array<string>;
  private coordinates: Array<number>;
  constructor(
    name: string,
    distance: number,
    message: string[],
    coordinates: Array<number>,
  ) {
    this.name = name;
    this.distance = distance;
    this.message = message;
    this.coordinates = coordinates;
  }
  getName() {
    return this.name;
  }

  getCoordinates() {
    return this.coordinates;
  }

  getMsgLength(): number {
    return this.message.length;
  }

  getdistance() {
    return this.distance;
  }

  fixMsgDelay(realLength: number) {
    this.message = this.message.slice(
      this.message.length - realLength,
      this.message.length,
    );
  }

  getWordAt(position: number) {
    return this.message[position];
  }
}
