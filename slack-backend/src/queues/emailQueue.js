/**
 * Example Email Queue Configuration
 * Using Bull for job queue management
 */

// Uncomment when Bull is installed
// import Queue from 'bull';
// import { REDIS_HOST, REDIS_PORT } from '../config/serverConfig.js';

// export const emailQueue = new Queue('email', {
//   redis: {
//     host: REDIS_HOST,
//     port: REDIS_PORT
//   }
// });

// Queue events
// emailQueue.on('completed', (job, result) => {
//   console.log(`Job ${job.id} completed with result:`, result);
// });

// emailQueue.on('failed', (job, err) => {
//   console.error(`Job ${job.id} failed with error:`, err);
// });

export const emailQueue = {
  add: async (data) => {
    console.log('Queue not configured. Data:', data);
    // TODO: Install and configure Bull/BullMQ
  }
};
