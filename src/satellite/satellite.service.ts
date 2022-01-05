import { Injectable } from '@nestjs/common';

export interface Satellite {
  name: string;
  distance: number;
  message: string[];
  coordinates: Array<number>;
}

@Injectable()
export class SatelliteService {
  private name: string;
  private distance: number;
  private message: Array<string>;
  private coordinates: Array<number>;

  create(options: Satellite) {
    this.name = options.name;
    this.distance = options.distance;
    this.message = options.message;
    this.coordinates = options.coordinates;

    console.log('NEW SATELLITE', [options]);
    return this;
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
