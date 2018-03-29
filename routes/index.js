const router = require('koa-router')()
const Blog = require('../model/blog')

router.get('/', async (ctx, next) => {
  let  pageCount = 10, pageNo = 1;
  let query = ctx.query;
  if(query.pageCount&&query.pageCount>0){
    pageCount = parseInt(query.pageCount);
  }
  if(query.pageNo&&query.pageNo>1){
    pageNo = parseInt(query.pageNo);
  }
  try {
    let result = await Blog.findAndCount({
       order:[['id','DESC']],
       offset: pageCount  * (pageNo - 1),
       limit:pageCount
    });
    await ctx.render('index', {
      data: result,
      pageNo :pageNo,
      pageCount:pageCount
    })
 } catch (error) {
   console.log(error);
 }
})

router.get('/:id', async (ctx, next) => {
   let id = ctx.params.id;
   try {
     let blog = await Blog.findById(id);
     if(blog){
      await ctx.render('blog', {
        data: blog
      })
     }
   } catch (error) {
     console.log(error);
   }
})

module.exports = router
