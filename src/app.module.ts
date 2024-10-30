import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Log, LogSchema } from './user/model/log.model';
import { LogService } from './user/log.service';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LoggingInterceptor } from './user/log.intterceptor';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost:27017/demo'), MongooseModule.forFeature([{ name: Log.name, schema: LogSchema }]),UserModule],
  controllers: [AppController],
  providers: [AppService,
    LogService,
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
  ],
})
export class AppModule {}
