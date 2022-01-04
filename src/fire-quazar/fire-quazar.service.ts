import { Injectable } from '@nestjs/common';
import { TrilaterationService } from '../trilateration/trilateration.service';

@Injectable()
export class FireQuazarService {
  satellites: Array<any> = [];
  constructor(private TrilaterationService: TrilaterationService) {
    this.satellites.push(
      { name: 'kenobi', coordenates: [-500, -200] },
      { name: 'skywalker', coordenates: [100, -100] },
      { name: 'sato', coordenates: [500, 100] },
    );
    console.log(this.satellites);
  }
  public GetLocation(
    kenobiDist: number,
    skywalkerDist: number,
    satoDist: number,
  ): Array<number> {
    try {
      const distances = [kenobiDist, skywalkerDist, satoDist];
      console.log('SHIP DISTANCES: %o', distances);

      const vector: Array<any> = [];
      this.satellites.forEach((satellite, index) => {
        vector.push(
          this.TrilaterationService.vector(
            satellite.coordenates[0],
            satellite.coordenates[1],
            0,
            distances[index],
          ),
        );
      });

      const position = this.TrilaterationService.trilaterate(
        vector[0],
        vector[1],
        vector[2],
        true,
      );
      return position;
    } catch (error) {
      console.log(error);
      return [];
    }
  }
  public GetMessage(messages: Array<string>) {
    return messages;
  }
}
