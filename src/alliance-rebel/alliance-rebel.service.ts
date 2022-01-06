import { Inject, Injectable } from '@nestjs/common';
import { SatelliteService } from '../satellite/satellite.service';
import { TrilaterationService } from '../trilateration/trilateration.service';
import { AllianceRebel } from './alliante-rebel.interface';

@Injectable()
export class AllianceRebelService {
  private satellites: Array<SatelliteService> = [];

  constructor(
    @Inject('ALLIANCE_REBEL_OPTIONS') options: AllianceRebel,
    private trilateration: TrilaterationService,
  ) {
    // instance each satellite available
    options.forEach((sat) => {
      const satellite: SatelliteService = new SatelliteService(sat);
      this.satellites.push(satellite);
    });
  }

  findShipCoordinates(distances: Array<number>): Array<number> {
    try {
      const vectors = [];

      // add given ship distance to each satellite
      if (distances.length != this.satellites.length) {
        throw new Error(
          'Cant get ship position: not equal lenght distances array and satellites array',
        );
      }

      this.satellites.map((sat, index) => {
        sat.setDistance(distances[index]);
        return sat;
      });

      this.satellites.forEach((sat) => {
        const vector = this.trilateration.vector(
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
    } catch (error) {
      return [];
    }
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
