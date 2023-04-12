import * as winston from 'winston';
import { basicConfig } from 'src/common/constants/configuration';

const GetWinstonConfig = (): winston.LoggerOptions => {
  const options: winston.LoggerOptions = {};
  const { combine, colorize, printf } = winston.format;
  const { NODE_ENV, LOG_NAMESPACE, LOG_LEVEL } = process.env;

  if (NODE_ENV === 'production') {
    options.level = LOG_LEVEL?.toLowerCase() ?? 'http';
    options.format = winston.format.json();
    options.transports = [new winston.transports.Console()];
  } else {
    const myFormat = printf(
      ({ label, level, message, timestamp, callerName, ...rest }) => {
        const timestampDate = timestamp as Date;
        const timetxt = timestampDate.toString();
        const s = `${label} ${process.pid}  - ${timetxt}  ${level} [${callerName}] ${message}`;
        if (Object.keys(rest).length > 0) {
          return `${s} ${JSON.stringify(rest, undefined, 2)}`;
        }
        return s;
      },
    );
    options.level = LOG_LEVEL?.toLowerCase() ?? 'silly';
    options.format = combine(
      winston.format((info) => {
        // eslint-disable-next-line no-param-reassign
        info.level = info.level.toUpperCase();
        return info;
      })(),
      colorize({ all: true }),
      winston.format.label({
        label: LOG_NAMESPACE ? `[${LOG_NAMESPACE}]` : '[App]',
      }),
      winston.format.timestamp({ format: 'DD/MM/YYYY, HH:MM:SS' }),
      myFormat,
    );
    options.transports = [new winston.transports.Console()];
  }

  return options;
};

export default GetWinstonConfig;
