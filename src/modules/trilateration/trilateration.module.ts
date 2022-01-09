import { Module } from '@nestjs/common';
import { TrilaterationService } from './trilateration.service';

@Module({
  providers: [TrilaterationService],
  exports: [TrilaterationService],
})
export class TrilaterationModule {}
