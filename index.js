const koa = require("koa");
const app = new koa();

app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});
app.use(ctx => {
  ctx.body = { foo: "bar" };
});
app.listen(process.env.PORT || 3000);
