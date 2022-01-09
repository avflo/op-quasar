import { Injectable } from '@nestjs/common';
import { AllianceRebelService } from './modules/alliance-rebel/alliance-rebel.service';
@Injectable()
export class AppService {
  constructor(private allianceRebel: AllianceRebelService) {}
  public getLocation(
    kenobiDist: number,
    skywalkerDist: number,
    satoDist: number,
  ): Array<any> {
    try {
      const distances: Array<number> = [kenobiDist, skywalkerDist, satoDist];
      console.log('SHIP DISTANCES: %o', distances);
      return this.allianceRebel.findShipCoordinates(distances);
    } catch (error) {
      console.log(error);
      return [];
    }
  }
  public getMessage(messages: Array<Array<string>>) {
    try {
      if (messages.length != 3) {
        throw Error('Error: Only 3 messages are allowed');
      }
      return this.allianceRebel.decodeMessage(messages);
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}
