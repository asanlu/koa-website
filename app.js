const Koa = require('koa');

// 处理URL路由(router导入的是一个函数)
// const router =  require('koa-router')();

// 处理request 的body请求
const bodyParser = require('koa-bodyparser');
// 导入router mapping middleware:
const routesMapping = require('./src/controllers/routesMapping');

const app = new Koa();

// add bodyparser middleware:
app.use(bodyParser());
// add router middleware:
app.use(routesMapping());

// log request URL:
app.use(async (ctx, next) => {
    console.log(`process ${ctx.request.method} ${ctx.request.url}...`)
    await next();
});


// return html
// app.use(async (ctx, next)=>{
//     await next();
//     ctx.response.type = 'text/html';
//     ctx.response.body = '<h1>hello, koa2</h1>'
// });

app.listen(3000);
console.log('app start at port 3000...')