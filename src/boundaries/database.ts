import { extname, join } from 'path';

import { Connection, createConnection } from 'typeorm';

import config from '~/config';
import logger from '~/logger';

let connection: Connection | null = null;

export async function start() {
  if (!connection) {
    connection = await createConnection({
      type: 'postgres',
      url: config.db.uri,
      logging: config.logLevel === 'trace',
      entities: [join(__dirname, '..', 'entities', `*${extname(__filename)}`)],
      synchronize: true
    });
    logger.info('Connected to Postgres');
  }
}

export async function stop() {
  if (connection) {
    await connection.close();
    connection = null;
    logger.info('Disconnected from Postgres');
  }
}
