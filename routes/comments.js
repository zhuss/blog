const router = require('koa-router')()
const Comments = require('../model/comments')

router.prefix('/comments')


//新建
router.post('/create', async (ctx, next) => {
    let comments = ctx.request.body.data;
    if(comments&&comments.blogid&&comments.content){
     try{
       await Comments.create({
         blogid:comments.blogid,
         content:comments.content
       });
       ctx.body = {
         code:200,
         msg:"success"
       }
     }catch(error){
       console.log(error);
         ctx.body = {
           code:100,
           msg:"系统错误"
         }
     }
    }else{
     ctx.body = {
       code:101,
       msg:"参数验证不通过"
     }
   }
 })

//分页获取
router.get('/list', async (ctx, next) => {
    let  pageCount = 10, pageNo = 1;
    let query = ctx.query;
    if(query.pageCount&&query.pageCount>0){
      pageCount = parseInt(query.pageCount);
    }
    if(query.pageNo&&query.pageNo>1){
      pageNo = parseInt(query.pageNo);
    }
    try {
       let result = await Comments.findAndCount({
          order:[['id','DESC']],
          offset: pageCount  * (pageNo - 1),
          limit:pageCount,
          where: {
            blogid: query.blogid
          }
       });
       ctx.body = {
          code:200,
          data:result,
          msg:"success"
        }
    } catch (error) {
        ctx.body = {
          code:100,
          msg:"系统错误"
        }
    }
  })


  module.exports = router