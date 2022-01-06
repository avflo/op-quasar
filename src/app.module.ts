import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AllianceRebelModule } from './alliance-rebel/alliance-rebel.module';
import configuration from './config/configuration';

const satellites = [
  { name: 'kenobi', distance: 0, message: [], coordinates: [-500, -200] },
  { name: 'skywalker', distance: 0, message: [], coordinates: [100, -100] },
  { name: 'sato', distance: 0, message: [], coordinates: [500, 100] },
];

@Module({
  imports: [
    AllianceRebelModule.register(satellites),
    ConfigModule.forRoot({
      load: [configuration],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
