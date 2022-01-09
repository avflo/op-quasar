import { Document } from 'mongoose';

export interface ImperialSignalModel extends Document {
  name: string;
  distance: number;
  message: Array<string>;
}

export interface ImperialSignal {
  name: string;
  distance: number;
  message: Array<string>;
}
