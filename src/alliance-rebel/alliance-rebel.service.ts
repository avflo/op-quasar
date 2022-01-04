import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { SatelliteService } from '../satellite/satellite.service';
import { TrilaterationService } from '../trilateration/trilateration.service';
@Injectable()
export class AllianceRebelService {
  private satellites: Array<any> = [];
  //private trilateration: TrilaterationService = new TrilaterationService();
  constructor(
    /*  @Inject(forwardRef(() => SatelliteService))
    @Inject(forwardRef(() => TrilaterationService)) */
    satellites: Array<any>,
  ) {
    this.satellites = satellites;
  }

  decodeMessage() {
    const decodedMsg: string[] = [];

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

    return decodedMsg.join(' ');
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

  findShipCoordinates() {
    const vectors = [];

    /* this.satellites.forEach((sat) => {
      vectors.push(
        sat.getCoordinates()[0],
        sat.getCoordinates()[1],
        0,
        sat.getdistance,
      );
    });
 */
    /* const position = this.TrilaterationService.trilaterate(
      vectors[0],
      vectors[1],
      vectors[2],
      true,
    ); */
    return null;
  }
}
