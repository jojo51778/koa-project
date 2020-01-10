const Koa = require('koa')
const app = new Koa()

app.use(async(ctx) => {
    let url = ctx.url
    // 从上下文request对象中获取
    let request = ctx.request
    let req_query = request.query
    let req_querystring = request.querystring

    // 直接从上下文获取
    let ctx_query = ctx.query
    let ctx_querystring = ctx.querystring

    ctx.body = {
        url,
        req_query,
        req_querystring,
        ctx_query,
        ctx_querystring
    }

})

app.listen(3000, () => {
    console.log('服务启动在3000端口')
})