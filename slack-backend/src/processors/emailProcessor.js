/**
 * Example Email Processor
 * Processes email jobs from the queue
 */

import { emailQueue } from '../queues/emailQueue.js';

class EmailProcessor {
  constructor() {
    this.processJobs();
  }

  processJobs() {
    // Uncomment when Bull is configured
    // emailQueue.process(async (job) => {
    //   return this.handleEmailJob(job.data);
    // });
  }

  async handleEmailJob(data) {
    const { type, to, userName, resetToken } = data;

    console.log(`Processing ${type} email for ${to}`);

    try {
      switch (type) {
        case 'welcome':
          await this.sendWelcomeEmail(to, userName);
          break;
        case 'reset-password':
          await this.sendResetPasswordEmail(to, resetToken);
          break;
        default:
          throw new Error(`Unknown email type: ${type}`);
      }

      return { success: true, message: `${type} email sent to ${to}` };
    } catch (error) {
      console.error(`Error processing email job:`, error);
      throw error;
    }
  }

  async sendWelcomeEmail(to, userName) {
    // TODO: Integrate with email service (SendGrid, AWS SES, etc.)
    console.log(`Sending welcome email to ${to} for ${userName}`);
    // await emailService.send({ to, subject: 'Welcome!', template: 'welcome', data: { userName } });
  }

  async sendResetPasswordEmail(to, resetToken) {
    // TODO: Integrate with email service
    console.log(`Sending reset password email to ${to} with token ${resetToken}`);
    // await emailService.send({ to, subject: 'Reset Password', template: 'reset-password', data: { resetToken } });
  }
}

export default EmailProcessor;
