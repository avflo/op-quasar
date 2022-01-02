import { Module } from '@nestjs/common';
import { FireQuazarController } from './fire-quazar.controller';
import { FireQuazarService } from './fire-quazar.service';

@Module({
  controllers: [FireQuazarController],
  providers: [FireQuazarService],
})
export class FireQuazarModule {
  knownSatellites: Array<any> = [];
  constructor() {
    this.knownSatellites.push(
      { name: 'kenobi', coordenates: [-500, -200] },
      { name: 'skywalker', coordenates: [100, -100] },
      { name: 'sato', coordenates: [500, 100] },
    );
    console.log(this.knownSatellites);
  }
  public getLocation() {
    console.info('getLocation function');
    return 200;
  }
}
