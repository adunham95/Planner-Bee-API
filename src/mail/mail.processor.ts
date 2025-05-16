import { MailerService } from '@nestjs-modules/mailer';
import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bull';

@Processor('email')
export class MailProcessor {
  constructor(private readonly mailerService: MailerService) {}

  @Process('sendEmail')
  async handleSendEmail(
    job: Job<{ to: string; subject: string; body: string; template: string }>,
  ) {
    const { to, subject, body, template } = job.data;

    console.log(`📧 Sending email to ${to}`);
    console.log(`Subject: ${subject}`);
    console.log(`Body: ${body}`);

    // Simulate sending email (replace with real email service like nodemailer)
    await this.mailerService.sendMail({
      to,
      template,
      subject,
    });
    console.log(`✅ Email sent to ${to}`);
  }

  @Process('sendECardNotification')
  async handleSendECardNotification(
    job: Job<{
      to: string;
      context: { eCardNumber: string; firstName: string };
    }>,
  ) {
    const {
      to,
      context: { eCardNumber, firstName },
    } = job.data;

    const template = 'ecard-notification';
    const subject = 'You have received a new ECard From Planner Bee';

    console.log(`📧 Sending email to ${to}`);

    try {
      await this.mailerService.sendMail({
        to: [to],
        template,
        subject,
        context: {
          firstName,
          ecardURL: `https://planner-bee.com/ecard/${eCardNumber}`,
        },
      });
      console.log(`✅ Email sent to ${to}`);
    } catch (error) {
      console.log(`❎ Email not sent`, error);
    }
  }
}
