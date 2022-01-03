import { Injectable } from '@nestjs/common';
import { TrilaterationService } from '../trilateration/trilateration.service';

@Injectable()
export class FireQuazarService {
  knownSatellites: Array<any> = [];
  constructor(private TrilaterationService: TrilaterationService) {
    this.knownSatellites.push(
      { name: 'kenobi', coordenates: [-500, -200] },
      { name: 'skywalker', coordenates: [100, -100] },
      { name: 'sato', coordenates: [500, 100] },
    );
    console.log(this.knownSatellites);
  }
  public GetLocation(
    kenobiDist: number,
    skywalkerDist: number,
    satoDist: number,
  ): any {
    try {
      console.log('SHIP DISTANCES: %o', [kenobiDist, skywalkerDist, satoDist]);

      const kenobiVector = this.TrilaterationService.vector(
        this.knownSatellites[0].coordenates[0],
        this.knownSatellites[0].coordenates[1],
        0,
        kenobiDist,
      );

      const skywalkerVector = this.TrilaterationService.vector(
        this.knownSatellites[1].coordenates[0],
        this.knownSatellites[1].coordenates[1],
        0,
        skywalkerDist,
      );

      const satoVector = this.TrilaterationService.vector(
        this.knownSatellites[2].coordenates[0],
        this.knownSatellites[2].coordenates[1],
        0,
        satoDist,
      );

      const position = this.TrilaterationService.trilaterate(
        kenobiVector,
        skywalkerVector,
        satoVector,
        true,
      );
      return position;
    } catch (error) {
      console.log(error);
      return `Error: ${error}`;
    }
  }
}
