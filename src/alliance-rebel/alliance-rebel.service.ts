import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { SatelliteService } from '../satellite/satellite.service';
import { Satellite } from '../satellite/satellite.interface';
import { TrilaterationService } from '../trilateration/trilateration.service';
import { AllianceRebel } from './alliante-rebel.interface';

@Injectable()
export class AllianceRebelService {
  private satellites: Array<SatelliteService> = [];
  private trilateration: TrilaterationService;

  constructor(@Inject('ALLIANCE_REBEL_OPTIONS') options: AllianceRebel) {
    console.log('construct alliance', options);
    //const testSat = new SatelliteService(options[0]);
    //console.log('test sat', testSat);
    options.forEach((sat) => {
      const satellite = new SatelliteService(sat);
      this.satellites.push(satellite);
    });
    console.log('alliance', this.satellites);
  }
  /* create(satellites: Array<any>) {
    this.satellites = satellites;
    return this;
  }
 */
  getSatellites() {
    console.log('getSatellites', this.satellites);
    return this.satellites;
  }
  findShipCoordinates(distances: Array<number>) {
    const vectors = [];
    this.trilateration = new TrilaterationService();

    // add distance to each satellite
    this.satellites.map((sat, index) => {
      sat.setDistance(distances[index]);
      //sat.distance = distances[index];
      return sat; //{ ...sat };
    });

    console.log('SAT + DISTANCES', this.satellites);
    this.satellites.forEach((sat) => {
      const vector = this.trilateration.vector(
        /* sat.coordinates[0],
        sat.coordinates[1],
        0,
        sat.distance, */
        sat.getCoordinates()[0],
        sat.getCoordinates()[1],
        0,
        sat.getdistance(),
      );
      vectors.push(vector);
    });

    const position = this.trilateration.trilaterate(
      vectors[0],
      vectors[1],
      vectors[2],
      true,
    );
    return position;
  }

  decodeMessage() {
    /* const decodedMsg: string[] = [];

    //saco mensajes erroneos del principio para corregir desfasaje
    const originalMsgLength = this.satellites
      .map((m) => m.getMsgLength())
      .reduce((a, b) => Math.min(a, b));
    this.satellites.forEach((s) => s.fixMsgDelay(originalMsgLength));

    if (this.satellites.length > 0) {
      const firstSat = this.satellites[0];
      const remainingSats = this.satellites.slice(1, this.satellites.length);

      for (let i = 0; i < originalMsgLength; i++) {
        const word = firstSat.getWordAt(i);

        if (this.isValidWord(word)) decodedMsg.push(word);
        else {
          decodedMsg.push(this.searchMissingWord(remainingSats, i));
        }
      }
    }

    return decodedMsg.join(' '); */
  }

  isValidWord(word: string) {
    return word !== '';
  }

  searchMissingWord(satellites: Array<any>, position: number) {
    let validWord = '';
    satellites.forEach((s) => {
      const word = s.getWordAt(position);
      if (this.isValidWord(word)) validWord = word;
    });

    return validWord;
  }
}
