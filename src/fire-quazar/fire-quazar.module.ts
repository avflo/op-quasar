import { Module } from '@nestjs/common';
import { FireQuazarController } from './fire-quazar.controller';
import { FireQuazarService } from './fire-quazar.service';
import { TrilaterationModule } from '../trilateration/trilateration.module';
import { SatelliteModule } from '../satellite/satellite.module';

@Module({
  controllers: [FireQuazarController],
  providers: [FireQuazarService],
  imports: [TrilaterationModule, SatelliteModule],
})
export class FireQuazarModule {}
