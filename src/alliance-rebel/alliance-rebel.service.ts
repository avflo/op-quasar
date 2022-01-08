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

  public findShipCoordinates(distances: Array<number>): Array<number> {
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

  public decodeMessage(messages: Array<Array<string>>): string | null {
    try {
      // set each message to each satellite
      this.satellites.forEach((sat, index) => {
        sat.setMessage(messages[index]);
      });

      /**
       * Remove delay in messages
       * map allow us to get message length for each satellite into a new array
       * then reduce a: previous value b: accumulated[] value, finally we got the original phrase length
       * **/
      const originalMsgLength = this.satellites
        .map((sat) => sat.getMsgLength())
        .reduce((prev, acc) => Math.min(prev, acc));

      /**
       * each satellite message array got a piece of complete message but the length of each array could be
       * different because the "delay" or "desfasaje" so we need to find the message with the minimun array length
       * to remove the delay, once we find it slice each message on each satellite
       */
      this.satellites.forEach((s) => s.fixMsgDelay(originalMsgLength));

      /**
       * Finally decode the message
       * replacing the missing words on the first satellite message array
       */
      return this.joinMessage();
    } catch (error) {
      console.error('💥 DECODE MESSAGE ERROR: %o', error);
      return null;
    }
  }

  private joinMessage() {
    try {
      const joinMessage = this.satellites[0].getMessage();

      // check every satellite after the first one
      this.satellites.slice(1).forEach((sat) => {
        // check every word in message that can replace the empty spaces
        joinMessage.forEach((word, position) => {
          joinMessage[position] =
            word === '' ? sat.getMessage()[position] : word;
        });
      });
      // clean empty strings in message
      return joinMessage.join(' ');
    } catch (error) {
      console.error('💥 JOIN SECRET MESSAGE ERROR: %o', error);
      return null;
    }
  }
}
