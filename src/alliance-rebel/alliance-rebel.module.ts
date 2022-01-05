import { forwardRef, Module } from '@nestjs/common';
import { AllianceRebelService } from './alliance-rebel.service';
import { TrilaterationService } from '../trilateration/trilateration.service';
import { SatelliteService } from '../satellite/satellite.service';
import { TrilaterationModule } from '../trilateration/trilateration.module';

@Module({
  imports: [TrilaterationModule],
  providers: [AllianceRebelService, TrilaterationService],
  exports: [AllianceRebelService],
})
export class AllianceRebelModule {}
