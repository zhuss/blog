const router = require('koa-router')()
const Blog = require('../model/blog')

router.prefix('/blog')

//根据id获取
router.get('/get', async (ctx, next) => {
   let id = ctx.query.id;
   try {
     let blog = await Blog.findById(id);
     if(blog){
      ctx.body = {
        code:200,
        data:blog,
        msg:"success"
      }
     }else{
      ctx.body = {
        code:201,
        msg:"找不到数据"
      }
     }
   } catch (error) {
    console.log(error);
    ctx.body = {
      code:100,
      msg:"系统错误"
    }
   }
})

//更新
router.post('/update', async (ctx,next) => {
  let blog = ctx.request.body.data;
  if(blog&&blog.id&&blog.title&&blog.author&&blog.abstract&&blog.content){
    try {
      await Blog.update(blog,{where:{id:blog.id}});
      ctx.body = {
        code:200,
        msg:"success"
      }
    } catch (error) {
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
     let result = await Blog.findAndCount({
        order:[['id','DESC']],
        offset: pageCount  * (pageNo - 1),
        limit:pageCount
     });
     ctx.body = {
        code:200,
        data:result,
        msg:"success"
      }
  } catch (error) {
      console.log(error);
      ctx.body = {
        code:100,
        msg:"系统错误"
      }
  }
  
})

//新建
router.post('/create', async (ctx, next) => {
   let blog = ctx.request.body.data;
   if(blog&&blog.title&&blog.author&&blog.abstract&&blog.content){
    try{
      await Blog.create({
        title:blog.title,
        author:blog.author,
        abstract:blog.abstract,
        content:blog.content
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

module.exports = router