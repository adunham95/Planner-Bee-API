import { ISendMailOptions, MailerService } from '@nestjs-modules/mailer';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class MailService {
  private readonly logger = new Logger(MailService.name);

  constructor(private readonly mailerService: MailerService) {}

  async sendEmail(params: {
    subject: string;
    template: string;
    to: string[];
    context: ISendMailOptions['context'];
  }) {
    await this.mailerService.sendMail({
      to: params.to,
      template: params.template,
      subject: params.subject,
    });
  }
}
