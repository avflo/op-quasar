import { Injectable, Inject } from '@nestjs/common';
import { AllianceRebelService } from './alliance-rebel/alliance-rebel.service';
import { SatelliteService } from './satellite/satellite.service';
@Injectable()
export class AppService {
  constructor(private allianceRebel: AllianceRebelService) {}
  public GetLocation(
    kenobiDist: number,
    skywalkerDist: number,
    satoDist: number,
  ): Array<any> {
    try {
      const distances: Array<number> = [kenobiDist, skywalkerDist, satoDist];
      //const satellites: Array<SatelliteService> = [];
      console.log('SHIP DISTANCES: %o', distances);

      /* this.knownSatellites.forEach((sat, index) => {
        const satellite = this.satellite.create({
          name: sat.name,
          distance: distances[index],
          message: [],
          coordinates: sat.cordinates,
        });

        console.log('push to satellites', satellite);
        satellites.push(satellite);
      });

      console.log('available satellites', satellites);
      */
      //const alliance = this.allianceRebel.create(satellites);
      return this.allianceRebel.findShipCoordinates(distances);
    } catch (error) {
      console.log(error);
      return [];
    }
  }
  public GetMessage(messages: Array<string>) {
    return messages;
  }
}
