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

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return 'FIRE QUAZAR';
  }

  @Post('/topsecret')
  topSecret(@Body() topSecret: TopSecretDTO, @Res() res: Response) {
    //this.appService.getLocation(topSecret.);
    res.status(HttpStatus.OK).json([topSecret]);
  }
}
