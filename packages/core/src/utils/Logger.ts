import winston from 'winston';
import { LoggingConfig } from '../types';

export class Logger {
  private logger: winston.Logger;

  constructor(config?: LoggingConfig) {
    const customFormat = winston.format.printf(({ timestamp, level, message, error }) => {
      const levelColors: Record<string, string> = {
        error: '\x1b[31m',
        warn: '\x1b[33m',
        info: '\x1b[36m',
        debug: '\x1b[35m',
      };
      
      const reset = '\x1b[0m';
      const dim = '\x1b[2m';
      const bold = '\x1b[1m';
      
      const levelName = level.replace(/\x1b\[\d+m/g, '');
      const color = levelColors[levelName] || '';
      
      let output = `${dim}[${timestamp}]${reset} ${color}${bold}${levelName.toUpperCase()}${reset} ${message}`;
      
      if (error && typeof error === 'object') {
        const err = error as Error;
        output += `\n${dim}${err.stack || err.message || String(error)}${reset}`;
      }
      
      return output;
    });

    const transports: winston.transport[] = [
      new winston.transports.Console({
        format: winston.format.combine(
          winston.format.timestamp({ format: 'HH:mm:ss' }),
          customFormat
        ),
      }),
    ];

    if (config?.file) {
      transports.push(
        new winston.transports.File({
          filename: config.file,
          format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.json()
          ),
        })
      );
    }

    this.logger = winston.createLogger({
      level: config?.level || 'info',
      transports,
    });
  }

  info(message: string): void {
    this.logger.info(message);
  }

  warn(message: string): void {
    this.logger.warn(message);
  }

  error(message: string, error?: Error): void {
    if (error) {
      this.logger.error(message, { error });
    } else {
      this.logger.error(message);
    }
  }

  debug(message: string): void {
    this.logger.debug(message);
  }

  success(message: string): void {
    this.logger.info(`✓ ${message}`);
  }
}
