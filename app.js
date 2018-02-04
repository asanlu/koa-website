const Koa = require('koa');
const path = require('path')
const koaStatic = require('koa-static')
const bodyParser = require('koa-bodyparser');
const render = require('koa-ejs');

// 处理URL路由(router导入的是一个函数)
// const router =  require('koa-router')();
const router = require('./src/routes');
// 导入router mapping middleware:
// const routesMapping = require('./src/mapping/routesMapping');

const app = new Koa();

// 添加bodyparser解析
app.use(bodyParser());
// 添加路由解析
// app.use(routesMapping());
app.use(router.routes());
app.use(router.allowedMethods());
// 添加静态文件解析
app.use(koaStatic(path.join(__dirname, './websites/public')));

// 渲染html页面配置
render(app, {
  root: path.join(__dirname, './websites/views'),
  layout: false,
  viewExt: 'html',
  cache: false,
  debug: false
});

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