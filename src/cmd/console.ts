import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { FireQuazarService } from '../fire-quazar/fire-quazar.service';

async function bootstrap() {
  const application = await NestFactory.createApplicationContext(AppModule);
  const args = process.argv.slice(2);
  const fireQuazar = application.get<FireQuazarService>(FireQuazarService);

  switch (args[0]) {
    case 'ship-location':
      console.log('get location command');
      console.log(fireQuazar.GetLocation(300, 632.45, 1000)); //100.0, 115.5, 142.7));
      break;
    case 'decode-message':
      console.log('decode message command');
      break;
    default:
      console.log('Command not found');
      process.exit(1);
  }

  await application.close();
  process.exit(0);
}

bootstrap();
