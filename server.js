const Koa = require('koa');
const Router = require('koa-router');
const db = require('./db.json');

const app = new Koa();
const router = new Router();

// Log requests
app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log('%s %s - %s', ctx.method, ctx.url, ms);
});

router.get('/api/users', async (ctx) => {
  ctx.body = db.users;
});

router.get('/api/users/:userId', async (ctx) => {
  const id = parseInt(ctx.params.userId);
  const user = db.users.find((user) => user.id === id);

  if (!user) {
    ctx.status = 404;
    ctx.body = { error: 'User not found' };
    return;
  }

  ctx.body = user;
});

router.get('/api/', async (ctx) => {
  ctx.body = "API ready to receive requests";
});

router.get('/', async (ctx) => {
  ctx.body = "User service ready";
});

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(3003, () => {
  console.log('Users service running on http://localhost:3003');
});
