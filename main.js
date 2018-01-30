const Koa = require('koa');

// 处理URL路由
const router =  require('koa-router')();
// 处理request 的body请求
const bodyParser = require('koa-bodyparser');

const app = new Koa();

app.use(bodyParser());

// log request URL:
app.use(async (ctx, next) => {
    console.log(`process ${ctx.request.method} ${ctx.request.url}...`)
    await next();
});

// add url-route:
router.get('/hello/:name', async (ctx, next) => {
    var name = ctx.params.name;
    ctx.response.body = `<h1>hello, ${name}!</h1>`;
});
router.get('/', async (ctx, next) => {
    ctx.response.body = '<h1>Index</h1>';
});

// add router middleware:
app.use(router.routes());

// return html
// app.use(async (ctx, next)=>{
//     await next();
//     ctx.response.type = 'text/html';
//     ctx.response.body = '<h1>hello, koa2</h1>'
// });

app.listen(3000);
console.log('app start at port 3000...')