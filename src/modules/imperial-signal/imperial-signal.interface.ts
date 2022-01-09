import { Document } from 'mongoose';

export interface ImperialSignal extends Document {
  name: string;
  distance: number;
  message: Array<string>;
}
