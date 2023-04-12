import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';

import { AppController } from './app.controller';
import configuration, { mailConfig } from './common/constants/configuration';
import { DatabaseConfig } from './common/constants/db.configuration';

import { LoggerModule } from './common/helpers/logger/Logger.Module';
import GetWinstonConfig from './common/helpers/logger/WinstonConfig';
import { MailService } from './common/helpers/mail/mail.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { join } from 'path';
import { NotesModule } from './notes/notes.module';



@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: DatabaseConfig
     }),  
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true, // no need to import into other modules
    }),
    MailerModule.forRoot({
      transport: {
        host: mailConfig.host,
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
          user: mailConfig.username, // generated ethereal user
          pass: mailConfig.password
        },
      },
      defaults: {
        from: '"nest-modules" <modules@nestjs.com>',
      },
      template: {
        dir: join(__dirname, 'common/helpers/mail/templates'),
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
    LoggerModule.forRoot(GetWinstonConfig()),
    AuthModule,
    UsersModule,
    NotesModule,
  ],
  controllers: [AppController],
  providers: [AppService,MailService],
  exports:[MailService]
})
export class AppModule {}
