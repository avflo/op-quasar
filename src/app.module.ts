import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { FireQuazarModule } from './fire-quazar/fire-quazar.module';
import configuration from './config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
    FireQuazarModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
