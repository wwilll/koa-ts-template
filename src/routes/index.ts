import Koa from 'koa';
import Router from '@koa/router';
import checkRouter from './check';

const router = new Router();

router.get('/favicon.ico', async (ctx) => (ctx.status = 204));

router.get('/', async (ctx) => (ctx.status = 404));

// 注册子路由
// router.use(checkRouter.routes(), checkRouter.allowedMethods());
router.use('/check', checkRouter.routes(), checkRouter.allowedMethods());

export const useRoutes = (app: Koa<Koa.DefaultState, Koa.DefaultContext>) => {
  // 路由处理
  app.use(router.routes()).use(router.allowedMethods());
};
