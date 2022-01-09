import { Module } from '@nestjs/common';
import { AllianceRebelService } from './alliance-rebel.service';
import { TrilaterationModule } from '../trilateration/trilateration.module';
import { AllianceRebel } from './alliante-rebel.interface';
import { ALLIANCE_REBEL_OPTIONS } from './constants';

@Module({})
export class AllianceRebelModule {
  static register(options: AllianceRebel) {
    return {
      module: AllianceRebelModule,
      imports: [TrilaterationModule],
      providers: [
        {
          provide: ALLIANCE_REBEL_OPTIONS,
          useValue: options,
        },
        AllianceRebelService,
      ],
      exports: [AllianceRebelService],
    };
  }
}
