import Koa, { Context } from 'koa';
import koaBody from 'koa-bodyparser';

import logger from '~/logger';
import router from './router';

const app = new Koa();

app.use(errorHandler);

app.use(
  koaBody({
    onerror: (error, ctx) => {
      logger.warn({ error, ctx }, 'Parsing error');
      ctx.throw('body parse error', 422);
    }
  })
);
app.use(router.routes());
app.use(router.allowedMethods());

async function errorHandler(ctx: Context, next: () => Promise<void>) {
  try {
    logger.trace({ headers: ctx.request.header, url: ctx.originalUrl }, 'New http request');
    await next();
  } catch (error) {
    const code = error.status || 500;
    ctx.status = code;
    ctx.type = 'application/json';
    ctx.body = { code, message: error.message };
    if (code >= 400 && code <= 499) {
      logger.trace({ error, ctx });
    } else {
      logger.error({ error, ctx });
    }
  }
}

export default app;
