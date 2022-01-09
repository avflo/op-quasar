import * as mongoose from 'mongoose';
import { DATABASE_CONNECTION } from './constants';
import { ConfigService } from '@nestjs/config';

export const databaseProviders = [
  {
    provide: DATABASE_CONNECTION,
    inject: [ConfigService],
    useFactory: (config: ConfigService): Promise<typeof mongoose> =>
      mongoose.connect(config.get<string>('mongoDBUri')),
  },
];
