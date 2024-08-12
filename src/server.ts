import mongoose from 'mongoose';
import config from './config/index';
import app from './app';

import { Server } from 'http';

process.on('uncaughtException', error => {
  process.exit(1);
});

let server: Server;
async function boostrap() {
  try {
    await mongoose.connect(config.database_url as string);
    console.log(`Database is connected successfully`);

    // Server is running
    app.listen(config.port, () => {
      console.log(`Server is running on port http://localhost:${config.port}`);
    });
  } catch (error) {
    console.log('Failed to connect Database', error);
  }

  process.on('unhandledRejection', error => {
    // console.log("Unhandled Rejection is detected, we are closing our server.............")
    if (server) {
      server.close(() => {
        console.log(error);
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  });
}

boostrap();

// console.log(x)

// process.on('SIGTERM', () => {
//   console.log('SIGTERM is received');
//   if (server) {
//     server.close();
//   }
// });
