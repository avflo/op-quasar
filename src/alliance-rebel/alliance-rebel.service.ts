import { Inject, Injectable } from '@nestjs/common';
import { SatelliteService } from '../satellite/satellite.service';
import { TrilaterationService } from '../trilateration/trilateration.service';
import { AllianceRebel } from './alliante-rebel.interface';
import { messages } from '../cmd/messages';

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

  decodeMessage(messages: Array<Array<string>>) {
    //const decodedMsg: string[] = [];

    this.satellites.forEach((sat, index) => {
      sat.setMessage(messages[index]);
    });

    /**
     * remove delay in messages
     * map allow us to get message length for each satellite into a new array
     * then reduce a: previous value b: accumulated[] value
     *
     * each satellite message array got a piece of complete message but the length of each array could be
     * different because the "delay" or "desfasaje" so we need to find the message with the minimun array length
     * to remove the delay
     * **/
    const originalMsgLength = this.satellites
      .map((sat) => sat.getMsgLength())
      .reduce((prev, acc) => Math.min(prev, acc)); //replace Math.min(... [1, 6, 2, 3, 4]) */

    this.satellites.forEach((s) => s.fixMsgDelay(originalMsgLength));

    const msg = [];

    this.satellites.forEach((s) => {
      msg.push(s.getMessage());
    });

    console.log('CLEANED', msg);

    const decodedPhrase = this.joinMessage(msg);

    return decodedPhrase;

    /* if (this.satellites.length > 0) {
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

    console.log(decodedMsg);
    return decodedMsg.join(' ');
    */
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

  private joinMessage(messages: Array<Array<string>>) {
    let joinMessage = [];

    for (let index = 0; index < messages.length; index++) {
      const message = messages[index];
      console.log('index', index);
      console.log('✉️', message);
      if (index == 0) {
        console.log('index 0 joinMessage = message');
        joinMessage = message;
        continue;
      }

      joinMessage.forEach((word, position) => {
        console.log('each joinMessage');
        if (word === '') {
          console.log('word = "" ', word);
          console.log('equal joinMessage and message', [
            joinMessage[position],
            message[position],
          ]);
          joinMessage[position] = message[position];
        }
      });
    }

    console.log(' ==> ', joinMessage);
    return joinMessage.join(' ');
  }
}
