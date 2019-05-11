import { extname, join } from 'path';

import { ApolloServer, Config } from 'apollo-server-koa';
import { buildSchema } from 'type-graphql';

import logger from '~/logger';
import koa from './rest';

export let server: ApolloServer;

export async function start() {
  const options: Config = {
    schema: await buildSchema({
      resolvers: [join(__dirname, '..', 'resolvers', `*${extname(__filename)}`)],
      validate: false
    }),
    introspection: true,
    playground: true,
    formatError: (error: any) => {
      logger.info(error);
      return error;
    },
    extensions: []
  };

  server = new ApolloServer(options);
  server.applyMiddleware({
    app: koa,
    path: '/graphql'
  });
  logger.info('GraphQL is ready');
}

export async function stop() {
  logger.info('GraphQL stopped');
  await server.stop();
}
