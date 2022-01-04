import { forwardRef, Module } from '@nestjs/common';
import { AllianceRebelService } from './alliance-rebel.service';
import { TrilaterationService } from '../trilateration/trilateration.service';
import { SatelliteService } from '../satellite/satellite.service';

@Module({
  providers: [AllianceRebelService],
  exports: [AllianceRebelService],
})
export class AllianceRebelModule {}
