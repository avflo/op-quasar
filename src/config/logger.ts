import * as winston from 'winston';
import { WinstonModuleOptions } from 'nest-winston';

const logger: WinstonModuleOptions = {
  format: winston.format.combine(
    winston.format.timestamp({
      format: 'MM-DD-YYYY HH:mm:ss',
    }),
    winston.format.errors({ stack: true }),
    winston.format.splat(),
    winston.format.json(),
    winston.format.prettyPrint(),
    winston.format.simple(),
  ),
  defaultMeta: { service: 'op_fire_quasar' },
  transports: [
    //
    // - Write all logs with level `error` and below to `error.log`
    // - Write all logs with level `info` and below to `combined.log`
    //
    //new winston.transports.File({ filename: `logs/error/error_${logDate}.log`, level: 'error' }),
    //new winston.transports.File({ filename: `logs/info/combined_${logDate}.log`}),
    new winston.transports.Console(),
  ],
};

export default logger;
