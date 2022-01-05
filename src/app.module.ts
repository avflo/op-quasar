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

/* const satelliteFactory = {
  provide: 'SATELLITE',
  useFactory: () => {
    return {
      create: function (sat: any): SatelliteService {
        return new SatelliteService(
          sat.name,
          sat.distance,
          sat.message,
          sat.message,
        );
      },
    };
  },
}; */

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
    AllianceRebelModule,
    SatelliteModule,
  ],
  controllers: [AppController],
  providers: [AppService, AllianceRebelService, SatelliteService],
})
export class AppModule {}
