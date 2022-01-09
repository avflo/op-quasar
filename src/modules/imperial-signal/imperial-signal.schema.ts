import * as mongoose from 'mongoose';

export const ImperialSignalSchema = new mongoose.Schema({
  name: { type: String, required: true },
  distance: { type: Number, required: true },
  message: { type: [String], required: true },
  timestamp: { type: Date, default: Date.now },
});

/* export interface ImperialSignalModel extends mongoose.Document {
  name: string;
  distance: number;
  message: Array<string>;
}
 */
