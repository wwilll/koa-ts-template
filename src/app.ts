import Koa from 'koa';
import { useRoutes } from '@/src/routes';
import { wrapGreen, wrapRed } from '@/src/utils/tools';
import '@/src/check-sys-files';
const app = new Koa();
app.proxy = true; // ⭐ 关键，有nginx代理的话需要设置，使得ctx.request.ip拿到真实ip

app.on('error', (err, ctx) => {
  console.log(wrapRed('App on error:'), err);
});

useRoutes(app);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(wrapGreen(`\n> HTTP服务器启动完成(port: ${port}):`));
});
