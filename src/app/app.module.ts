import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { HttpErrorHandler } from '../shared/Handlers/http-error.handler';
import { LoggingInterceptor } from '../shared/Interceptors/logging.interceptor';
import { TimeoutInterceptor } from '../shared/Interceptors/timeout.interceptor';
import { ApiModule } from 'src/api/api.module';

@Module({
  imports: [TypeOrmModule.forRoot(), ApiModule],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpErrorHandler,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TimeoutInterceptor,
    },
  ],
})
export class AppModule {
  constructor(private readonly connection: Connection) { }
}
