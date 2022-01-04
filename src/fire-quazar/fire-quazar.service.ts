import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { TrilaterationService } from '../trilateration/trilateration.service';
import { SatelliteService } from '../satellite/satellite.service';
import { AllianceRebelService } from '../alliance-rebel/alliance-rebel.service';

@Injectable()
export class FireQuazarService {
  private knownSatellites: Array<any> = [];
  constructor(
    @Inject(forwardRef(() => SatelliteService))
    private AllianceRebelService: AllianceRebelService,
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
        satellites.push(
          new SatelliteService('sat.name', distances[index], [], [100, 100]),
        );
      });

      const alliance = new AllianceRebelService(satellites);
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
