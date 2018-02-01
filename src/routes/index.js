const router = require('koa-router')();

const renderIndex = async (ctx, next) => {
  ctx.response.body = `<h1>index index....</h1>`
}


module.exports = {
  'GET /': renderIndex,
}