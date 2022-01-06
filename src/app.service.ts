import { Injectable, Inject } from '@nestjs/common';
import { AllianceRebelService } from './alliance-rebel/alliance-rebel.service';
import { SatelliteService } from './satellite/satellite.service';
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
  public getMessage(messages: Array<string>) {
    return messages;
  }
}
