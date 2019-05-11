import { createServer } from 'http';
import { Socket } from 'net';

import config from '~/config';
import logger from '~/logger';
import koa from './rest';

const connectedSockets = new Set<Socket>();
const httpServer = createServer();
httpServer.on('request', koa.callback());
httpServer.on('connection', socket => {
  connectedSockets.add(socket);
  socket.once('close', () => connectedSockets.delete(socket));
});

export async function start(): Promise<void> {
  if (httpServer.listening) throw new Error('HTTP Server is already listening');
  const serverListenPromise = new Promise((resolve, reject) => {
    httpServer.listen(config.http.port, resolve);
    httpServer.once('error', reject);
  });
  await serverListenPromise;
  logger.info(`HTTP server started on ${config.http.port}`);
}

export async function stop(): Promise<void> {
  if (!httpServer.listening) throw new Error('HTTP Server is not listening');
  const serverClosePromise = new Promise((resolve, reject) => {
    httpServer.once('close', resolve);
    httpServer.close(err => {
      if (err) reject(err);
    });
  });
  connectedSockets.forEach(socket => socket.destroy());
  await serverClosePromise;
  connectedSockets.clear();
  logger.info('Http server stopped');
}
