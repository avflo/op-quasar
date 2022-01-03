import { Module } from '@nestjs/common';
import { FireQuazarController } from './fire-quazar.controller';
import { FireQuazarService } from './fire-quazar.service';
import { TrilaterationModule } from '../trilateration/trilateration.module';

@Module({
  controllers: [FireQuazarController],
  providers: [FireQuazarService],
  imports: [TrilaterationModule],
})
export class FireQuazarModule {}
