import { Injectable, Inject } from '@nestjs/common';
import { AllianceRebelService } from './alliance-rebel/alliance-rebel.service';
import { SatelliteService } from './satellite/satellite.service';
@Injectable()
export class AppService {
  private knownSatellites: Array<any> = [];
  constructor(
    private satellite: SatelliteService,
    private allianceRebel: AllianceRebelService,
  ) {
    this.knownSatellites = [
      { name: 'kenobi', cordinates: [-500, -200] },
      { name: 'skywalker', cordinates: [100, -100] },
      { name: 'sato', cordinates: [500, 100] },
    ];
  }
  public GetLocation(
    kenobiDist: number,
    skywalkerDist: number,
    satoDist: number,
  ): Array<number> {
    try {
      const distances: Array<number> = [kenobiDist, skywalkerDist, satoDist];
      const satellites: Array<SatelliteService> = [];
      console.log('SHIP DISTANCES: %o', distances);

      this.knownSatellites.forEach((sat, index) => {
        const satellite = this.satellite.create({
          name: sat.name,
          distance: distances[index],
          message: [],
          coordinates: sat.cordinates,
        });
        satellites.push(satellite);
      });

      const alliance = this.allianceRebel.create(satellites);
      return alliance.findShipCoordinates();
    } catch (error) {
      console.log(error);
      return [];
    }
  }
  public GetMessage(messages: Array<string>) {
    return messages;
  }
}
