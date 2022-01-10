import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AllianceRebelModule } from './modules/alliance-rebel/alliance-rebel.module';
import configuration from './config/configuration';
import { ImperialSignalModule } from './modules/imperial-signal/imperial-signal.module';
import { DatabaseModule } from './database/database.module';
import { ApiKeyMiddleware } from './api-key.middleware';
import { WinstonModule } from 'nest-winston';
import logger from './config/logger';

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
    WinstonModule.forRoot(logger),
    DatabaseModule,
    ImperialSignalModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ApiKeyMiddleware)
      .exclude({ path: '/', method: RequestMethod.GET })
      .forRoutes(AppController);
  }
}
