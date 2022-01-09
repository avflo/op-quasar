import {
  Controller,
  Post,
  Get,
  Res,
  Req,
  HttpStatus,
  Body,
} from '@nestjs/common';
import { AppService } from './app.service';
import { TopSecretDTO } from './app.dto';
import { Response } from 'express';
import { HttpException } from '@nestjs/common';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return 'FIRE QUAZAR';
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
}
