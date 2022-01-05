import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
//import { FireQuazarModule } from './fire-quazar/fire-quazar.module';
/* import { TrilaterationModule } from './trilateration/trilateration.module';
import { TrilaterationService } from './trilateration/trilateration.service'; */
import { SatelliteService } from './satellite/satellite.service';
import { SatelliteModule } from './satellite/satellite.module';
import { AllianceRebelModule } from './alliance-rebel/alliance-rebel.module';
import { AllianceRebelService } from './alliance-rebel/alliance-rebel.service';
import configuration from './config/configuration';

const satellites = [
  { name: 'kenobi', distance: 0, message: [], coordinates: [-500, -200] },
  { name: 'skywalker', distance: 0, message: [], coordinates: [100, -100] },
  { name: 'sato', distance: 0, message: [], coordinates: [500, 100] },
];

@Module({
  imports: [
    AllianceRebelModule.register(satellites),
    ConfigModule.forRoot({
      load: [configuration],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
