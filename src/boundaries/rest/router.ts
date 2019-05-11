import Router from 'koa-router';
import { getRepository } from 'typeorm';
import { User } from '~/entities/user';

const router = new Router({
  sensitive: true,
  strict: true
});

router
  .all('/graphl', () => {
    /* should be rewritten by appollo */
  })
  .get('/users', async ctx => {
    const userRepo = getRepository(User);
    ctx.body = {
      users: await userRepo.find({
        select: ['id', 'email']
      })
    };
  })
  .get('/', async ctx => {
    ctx.body = { status: 'OK' };
  });

export default router;
