import {
  Controller,
  Post,
  Get,
  Res,
  Param,
  HttpStatus,
  Body,
} from '@nestjs/common';
import { AppService } from './app.service';
import { ImperialSignalService } from './modules/imperial-signal/imperial-signal.service';
import { TopSecretDTO, TopSecretSplitDTO } from './app.dto';
import { Response } from 'express';
import { HttpException } from '@nestjs/common';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly imperialSignalService: ImperialSignalService,
  ) {}

  @Get()
  getHello(@Res() res: Response) {
    res.status(HttpStatus.OK).json('OPERATION FIRE QUASAR');
  }

  @Post('/topsecret')
  topSecret(@Body() topSecret: TopSecretDTO, @Res() res: Response) {
    const position = this.appService.getLocation(
      topSecret.satellites[0].distance,
      topSecret.satellites[1].distance,
      topSecret.satellites[2].distance,
    );

    if (!position)
      throw new HttpException('unknow ship position', HttpStatus.BAD_REQUEST);

    const message = this.appService.getMessage([
      topSecret.satellites[0].message,
      topSecret.satellites[1].message,
      topSecret.satellites[2].message,
    ]);

    if (!message)
      throw new HttpException('unknow ship message', HttpStatus.BAD_REQUEST);

    res.status(HttpStatus.OK).json({ position, message });
  }

  @Post('/topsecret_split/:satellite_name')
  async topSecretSplitCreate(
    @Param('satellite_name') satellite_name: string,
    @Body() topSecretSplit: TopSecretSplitDTO,
    @Res() res: Response,
  ) {
    const impSignal = {
      name: satellite_name,
      distance: topSecretSplit.distance,
      message: topSecretSplit.message,
    };
    const saved = await this.imperialSignalService.saveSignal(impSignal);
    res.status(HttpStatus.OK).json({ saved });
  }

  @Get('/topsecret_split')
  async topSecretSplit(@Res() res: Response) {
    const signals = await this.imperialSignalService.getAllSignals();
    if (!signals || signals.length != 3)
      throw new HttpException(
        'missed information, cant determinate message or position',
        HttpStatus.BAD_REQUEST,
      );

    const position = this.appService.getLocation(
      signals[0].distance,
      signals[1].distance,
      signals[2].distance,
    );

    if (!position)
      throw new HttpException('unknow ship position', HttpStatus.BAD_REQUEST);

    const message = this.appService.getMessage([
      signals[0].message,
      signals[1].message,
      signals[2].message,
    ]);

    if (!message)
      throw new HttpException('unknow ship message', HttpStatus.BAD_REQUEST);

    res.status(HttpStatus.OK).json({ position, message });
  }
}
