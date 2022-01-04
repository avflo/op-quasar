import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { FireQuazarModule } from './fire-quazar/fire-quazar.module';
import { TrilaterationModule } from './trilateration/trilateration.module';
import { SatelliteService } from './satellite/satellite.service';
import { SatelliteModule } from './satellite/satellite.module';
import configuration from './config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
    FireQuazarModule,
    TrilaterationModule,
    SatelliteModule,
  ],
  controllers: [AppController],
  providers: [AppService, SatelliteService],
})
export class AppModule {}
