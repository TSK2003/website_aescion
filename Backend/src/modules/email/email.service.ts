import { Injectable, Logger } from '@nestjs/common';
import { EmailRepository } from './email.repository';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter: nodemailer.Transporter;
  private readonly logger = new Logger(EmailService.name);

  constructor(private readonly emailRepo: EmailRepository) {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '587', 10),
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }

  async getTemplates(tenantId: string) {
    return this.emailRepo.getTemplates(tenantId);
  }

  async getLogs(tenantId: string) {
    return this.emailRepo.getLogs(tenantId);
  }

  // SMTP sending implementation
  async sendEmail(
    to: string,
    subject: string,
    html: string,
  ) {
    try {
      const info = await this.transporter.sendMail({
        from: process.env.SMTP_FROM || '"Aescion System" <no-reply@aesciontech.com>',
        to,
        subject,
        html,
      });
      this.logger.log(`Email sent: ${info.messageId}`);
      return { status: 'SENT', message: 'Email sent successfully.' };
    } catch (error) {
      this.logger.error(`Error sending email to ${to}`, error);
      return { status: 'FAILED', message: 'Email sending failed.' };
    }
  }
}
