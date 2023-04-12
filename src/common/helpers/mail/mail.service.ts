import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { CommonMailDto } from './dto/mail.dto';
import { EmailFields, TemplateTypes } from './enums/template.code.enum';
import { NotFoundException } from 'src/common/helpers/exception/NotFoundException';
import { LoggerService } from 'src/common/helpers/logger/Logger.service';
import { IMail } from 'src/common/model/interface/IMail';

@Injectable()
export class MailService extends CommonMailDto {
  constructor(private readonly mailerService: MailerService,
    private logger: LoggerService) {
    super();
  }

  async sendingMail(mailDto:IMail, templateTypes: TemplateTypes) {
    try {
      await this.mailerService
        .sendMail({
          to: mailDto.to, // list of receivers
          from: EmailFields.reply_from, // sender address
          cc: mailDto.cc,
          subject: mailDto.subject, // Subject line
          template: `${templateTypes}`,
          context: { data: mailDto.data,url:mailDto.url},
        })
      return {
        statusCode: 200,
        message: 'Email sent successfully',
      };
    } catch (error) {
      this.logger.error("🚀 ~ file: mails.service.ts ~ line 237 ~ MailsService ~ error", error)

      this.logger.verbose(
        `Some error occured during email`, error
      );

      if (error.status === 404) {
        throw new NotFoundException();
      }
      throw new InternalServerErrorException(error.message);
    }
  }

}
