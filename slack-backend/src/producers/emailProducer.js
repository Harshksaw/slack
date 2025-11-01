/**
 * Example Email Producer
 * Adds email jobs to the queue
 */

import { emailQueue } from '../queues/emailQueue.js';

class EmailProducer {
  async sendWelcomeEmail(userEmail, userName) {
    const jobData = {
      type: 'welcome',
      to: userEmail,
      userName: userName,
      timestamp: new Date()
    };

    await emailQueue.add(jobData, {
      attempts: 3,
      backoff: {
        type: 'exponential',
        delay: 2000
      }
    });

    console.log(`Welcome email job queued for ${userEmail}`);
  }

  async sendResetPasswordEmail(userEmail, resetToken) {
    const jobData = {
      type: 'reset-password',
      to: userEmail,
      resetToken: resetToken,
      timestamp: new Date()
    };

    await emailQueue.add(jobData, {
      attempts: 3,
      backoff: {
        type: 'exponential',
        delay: 2000
      }
    });

    console.log(`Reset password email job queued for ${userEmail}`);
  }
}

export default EmailProducer;
