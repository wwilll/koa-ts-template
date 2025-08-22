import { appendToIpLogFile } from '@/src/utils/ip-check-log';
import { readConfig } from '@/src/utils/tools';
import Router from '@koa/router';

// const router = new Router({ prefix: '/check' });
const router = new Router();

router.get('/ip/:key', async (ctx, next) => {
  const k = ctx.params.key;
  const _allowKey = (await readConfig('@/config/checkip.json'))?.allowKey || [];

  if (!_allowKey.includes(k)) {
    ctx.status = 204;
    return;
  }
  const showDetail = ctx.querystring === 'more';
  const xRealIp = ctx.request.headers['x-real-ip']?.toString();
  const xForwardedFor = ctx.request.headers['x-forwarded-for']?.toString();
  // const realIp = xForwardedFor?.split(',')[0].trim() || xRealIp || reqIp; // app.proxy = true会帮助处理
  let realIp = ctx.request.ip;
  if (realIp?.startsWith('::ffff:')) realIp = realIp.slice(7);
  const msg = `realIp: ${realIp || ''}, xRealIp: ${xRealIp || ''}, xForwardedFor: ${xForwardedFor || ''}`;
  appendToIpLogFile(msg);
  ctx.body = showDetail ? msg : realIp;
});

export default router;
