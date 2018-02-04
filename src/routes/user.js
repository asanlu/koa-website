
// router.get('/user', async () => {
//   await ctx.render('./user', {
//     title: 'index ejs title'
//   });
// });

module.exports = {
  async getusr(ctx, next) {
    await ctx.render('./user', {
      title: 'index ejs title'
    })
  }
};