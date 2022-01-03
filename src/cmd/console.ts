import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { FireQuazarService } from '../fire-quazar/fire-quazar.service';

async function bootstrap() {
  const application = await NestFactory.createApplicationContext(AppModule);
  const args = process.argv.slice(2);
  const fireQuazar = application.get<FireQuazarService>(FireQuazarService);

  switch (args[0]) {
    case 'ship-location':
      console.log('📡 GET IMPERIAL SHIP LOCATION...');
      if (args.length >= 4) {
        // EXAMPLE: (300, 632.45, 1000) or (100.0, 115.5, 142.7);
        console.log(
          '📍 SHIP POSITION: ',
          fireQuazar.GetLocation(
            parseFloat(args[1]),
            parseFloat(args[2]),
            parseFloat(args[3]),
          ),
        );
      } else {
        // array elements are less than the expected 'command', 'dist1', 'dist1', 'dist3',
        console.error('need at last 3 distances');
      }
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
