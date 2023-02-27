import { Module } from '@nestjs/common';
import { LoggingService } from './loging.service';

@Module({
  providers: [
    LoggingService
  ],
  exports: [LoggingService],
})
export class LoggingModule {}
