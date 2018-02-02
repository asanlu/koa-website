const Koa = require('koa');
const path = require('path')
const koaStatic = require('koa-static')
const bodyParser = require('koa-bodyparser');

// 处理URL路由(router导入的是一个函数)
// const router =  require('koa-router')();

// 导入router mapping middleware:
const routesMapping = require('./src/controllers/routesMapping');

const app = new Koa();

// 添加bodyparser解析
app.use(bodyParser());
// 添加路由解析
app.use(routesMapping());
// 添加静态文件解析
app.use(koaStatic(path.join(__dirname, './websites/public')));

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