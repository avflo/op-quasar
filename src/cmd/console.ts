import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { FireQuazarModule } from '../fire-quazar/fire-quazar.module';

async function bootstrap() {
  const application = await NestFactory.createApplicationContext(AppModule);
  const args = process.argv.slice(2);
  const fireQuazar = application.get(FireQuazarModule);

  switch (args[0]) {
    case 'ship-location':
      console.log('get location command');
      console.info(fireQuazar.getLocation());
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
