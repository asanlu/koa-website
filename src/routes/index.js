const router = require('koa-router')();

const user = require('./user');

// const renderIndex = async (ctx, next) => {
//   await ctx.render('./index', {
//     title: 'index ejs title'
//   });
// }

// module.exports = {
//   'GET /': renderIndex,
// }


router.get('/', async (ctx, next) => {
  await ctx.render('./index', {
    title: 'index ejs title'
  });
});


router.get('/user', user.getusr);
module.exports = router;