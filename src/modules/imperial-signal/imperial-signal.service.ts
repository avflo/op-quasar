import { Injectable, Inject } from '@nestjs/common';
import { Model } from 'mongoose';
import {
  ImperialSignal,
  ImperialSignalModel,
} from './imperial-signal.interface';

@Injectable()
export class ImperialSignalService {
  constructor(
    @Inject('IMPERIAL_SIGNAL_MODEL')
    private imperialSignalModel: Model<ImperialSignalModel>,
  ) {}

  public async saveSignal(impSignal: ImperialSignal): Promise<boolean> {
    try {
      const newSignal = new this.imperialSignalModel(impSignal);
      const result = newSignal.save();
      return result ? true : false;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  public async getAllSignals(): Promise<ImperialSignal[] | null> {
    try {
      const satNames = ['kenobi', 'skywalker', 'sato'];
      const signals = [];

      for await (const name of satNames) {
        const signal = await this.imperialSignalModel
          .find({
            name: name,
          })
          .sort({ timestamp: -1 })
          .limit(1)
          .exec();

        if (signal && signal.length >= 1) signals.push(signal[0]);
      }

      return signals;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}
