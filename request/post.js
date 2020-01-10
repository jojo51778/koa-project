const Koa = require('koa')
const app = new Koa()

app.use(async(ctx) => {
    if (ctx.url === '/' && ctx.method === 'GET') {
        let html = `
            <h1>koa2 request post demo</h1>
            <form method="POST" action="/">
                <p>userName</p>
                <input name="userName" /><br/>
                <p>nickName</p>
                <input name="nickName" /><br/>
                <p>email</p>
                <input name="email" /><br/>
                <button type="submit">submit</button>
            </form>
        `
        ctx.body = html

    } else if (ctx.url === '/' && ctx.method === 'POST') {
        let postData = await parsePostData(ctx)
        ctx.body = postData
    } else {
        ctx.body = '<h1>404！！！ o(╯□╰)o</h1>'
    }
})


// 解析上下文里node原生请求的post参数
function parsePostData(ctx) {
    return new Promise((resolve, reject) => {
        try {
            let postdata = '';
            ctx.req.addListener('data', (data) => {
                postdata += data
            })
            ctx.req.addListener('end', () => {
                let parsedata = parseQueryStr(postdata)
                resolve(parsedata)
            })
        } catch (err) {
            reject(err)
        }
    })
}

// 将POST请求参数字符串解析成json
function parseQueryStr(queryStr) {
    let queryData = {}
    let queryStrList = queryStr.split('&')
    console.log(queryStrList)

    for (let [index, queryStr] of queryStrList.entries()) {
        let itemList = queryStr.split('=')
        queryData[itemList[0]] = decodeURIComponent(itemList[1])
    }
    return queryData
}

app.listen(3000, () => {
    console.log('服务启动在3000端口')
  })