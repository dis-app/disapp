import { Logger } from '../utils/Logger';

export class ErrorHandler {
  private logger: Logger;

  constructor(logger: Logger) {
    this.logger = logger;
  }

  handle(error: Error, context?: string): void {
    this.logger.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    this.logger.error(`❌ Error${context ? ` in ${context}` : ''}`);
    this.logger.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    this.logger.error('', error);
    this.logger.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  }

  async handleAsync<T>(
    fn: () => Promise<T>,
    context?: string
  ): Promise<T | null> {
    try {
      return await fn();
    } catch (error) {
      this.handle(error as Error, context);
      return null;
    }
  }

  handleCommandError(error: Error, commandName: string, userId: string): void {
    this.logger.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    this.logger.error('❌ Command Execution Failed');
    this.logger.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    this.logger.error(`Command: /${commandName}`);
    this.logger.error(`User: ${userId}`);
    this.logger.error('', error);
    this.logger.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  }

  handleDatabaseError(error: Error, operation: string): void {
    this.logger.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    this.logger.error('❌ Database Error');
    this.logger.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    this.logger.error(`Operation: ${operation}`);
    this.logger.error('', error);
    this.logger.error('');
    this.logger.error('Common issues:');
    this.logger.error('• Database connection lost');
    this.logger.error('• Invalid query syntax');
    this.logger.error('• Missing table or column');
    this.logger.error('• Permission denied');
    this.logger.error('');
    this.logger.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  }

  handleValidationError(errors: string[]): void {
    this.logger.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    this.logger.error('❌ Validation Failed');
    this.logger.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    errors.forEach(err => this.logger.error(`• ${err}`));
    this.logger.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  }
}
