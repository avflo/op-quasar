import { Injectable } from '@nestjs/common';
import { Satellite } from './satellite.interface';

@Injectable()
export class SatelliteService {
  private name: string;
  private distance: number;
  private message: Array<string>;
  private coordinates: Array<number>;

  constructor(options: Satellite) {
    this.name = options.name;
    this.distance = options.distance || 0;
    this.message = options.message;
    this.coordinates = options.coordinates;

    console.log('NEW SATELLITE', [options.name]);
  }

  setDistance(distance: number) {
    this.distance = distance;
  }

  setMessage(message: Array<string>) {
    this.message = message;
  }

  getName() {
    return this.name;
  }

  getCoordinates() {
    return this.coordinates;
  }

  getMessage(): Array<string> {
    return this.message;
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

  /* getOriginalMsgLength() {
    Math.min(... this.message);
  } */
}
