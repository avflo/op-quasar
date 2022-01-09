import { Connection } from 'mongoose';
import { ImperialSignalSchema } from './imperial-signal.schema';
import { IMPERIAL_SIGNAL_MODEL } from './constants';

export const imperialSignalProviders = [
  {
    provide: IMPERIAL_SIGNAL_MODEL,
    useFactory: (connection: Connection) =>
      connection.model('ImperialSignal', ImperialSignalSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
