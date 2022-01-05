import { forwardRef, Module } from '@nestjs/common';
import { FireQuazarController } from './fire-quazar.controller';
import { FireQuazarService } from './fire-quazar.service';
import { TrilaterationModule } from '../trilateration/trilateration.module';
import { SatelliteModule } from '../satellite/satellite.module';
import { AllianceRebelModule } from '../alliance-rebel/alliance-rebel.module';

@Module({
  imports: [
    forwardRef(() => SatelliteModule),
    forwardRef(() => AllianceRebelModule),
  ],
  controllers: [FireQuazarController],
  providers: [FireQuazarService],
})
export class FireQuazarModule {}
