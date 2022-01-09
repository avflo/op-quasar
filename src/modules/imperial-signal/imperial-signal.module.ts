import { Module } from '@nestjs/common';
import { ImperialSignalService } from './imperial-signal.service';
import { DatabaseModule } from '../../database/database.module';
import { imperialSignalProviders } from './imperial-signal.providers';

@Module({
  imports: [DatabaseModule],
  providers: [ImperialSignalService, ...imperialSignalProviders],
  exports: [ImperialSignalService],
})
export class ImperialSignalModule {}
