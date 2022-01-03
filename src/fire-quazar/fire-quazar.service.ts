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
  public GetLocation(kenobi: number, skywalker: number, sato: number): any {
    try {
      console.log('SHIP DISTANCES: %o', [kenobi, skywalker, sato]);
      const position = this.TrilaterationService.trilaterate(
        {
          x: this.knownSatellites[0].coordenates[0],
          y: this.knownSatellites[0].coordenates[1],
          z: 0,
          r: kenobi,
        },
        {
          x: this.knownSatellites[1].coordenates[0],
          y: this.knownSatellites[1].coordenates[1],
          z: 0,
          r: skywalker,
        },
        {
          x: this.knownSatellites[2].coordenates[0],
          y: this.knownSatellites[2].coordenates[1],
          z: 0,
          r: sato,
        },
        true,
      );
      return position;
    } catch (error) {
      console.log(error);
      return `Error: ${error}`;
    }
  }
}
