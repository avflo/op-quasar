import { Injectable, Inject } from '@nestjs/common';
import { Model } from 'mongoose';
import { ImperialSignal } from './imperial-signal.interface';

@Injectable()
export class ImperialSignalService {
  constructor(
    @Inject('IMPERIAL_SIGNAL_MODEL')
    private imperialSignalModel: Model<ImperialSignal>,
  ) {}

  public createImperialSignal() {
    const newSignal = new this.imperialSignalModel({
      name: 'kenobi',
      distance: 300,
      message: ['este', '', '', 'mensaje', ''],
    });

    const result = newSignal.save();

    console.log(result);
    return result;
  }
}
