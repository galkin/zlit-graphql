import { join } from 'path';

import { load } from 'dotenv-safe';
import { LevelWithSilent } from 'pino';

load({
  allowEmptyValues: true,
  path: join(__dirname, '..', '.env'),
  sample: join(__dirname, '..', '.env.example')
});

export default {
  logLevel: process.env.LOG_LEVEL! as LevelWithSilent,
  http: {
    port: parseInt(process.env.HTTP_PORT!, 10)
  },
  db: {
    uri: process.env.POSTGRES_URI!
  },
  shutdownTimeout: parseInt(process.env.SHUTDOWN_TIMEOUT!, 10)
};
