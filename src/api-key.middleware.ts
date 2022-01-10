import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class ApiKeyMiddleware implements NestMiddleware {
  constructor(private readonly config: ConfigService) {}
  use(req: Request, res: Response, next: NextFunction) {
    const allowedApiKey = this.config.get('apiKey');
    console.log('Request X API KEY HEADER', req.headers['x-api-key']);

    if (!req.headers['x-api-key']) {
      throw new HttpException(
        'forbidden: api key not provided',
        HttpStatus.FORBIDDEN,
      );
    }

    if (req.headers['x-api-key'] != allowedApiKey) {
      throw new HttpException(
        'forbidden: non valid api key',
        HttpStatus.FORBIDDEN,
      );
    }

    next();
  }
}
