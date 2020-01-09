const Koa = require('koa')
const fs = require('fs')
const app = new Koa()
const path = require('path')

function render(page) {
    return new Promise((resolve, reject) => {
        let viewUrl = path.resolve(__dirname, `./view/${page}`)
        // let viewUrl = `./router-simple/view/${page}`
        fs.readFile(viewUrl, 'binary', (err, data) => {
            if (err) {
                reject(err)
            } else {
                resolve(data)
            }
        })
    })
}

async function router(url) {
    let view = '404.html'
    switch (url) {
        case '/':
            view = 'index.html'
            break
        case '/index':
            view = 'index.html'
            break
        case '/todo':
            view = 'todo.html'
            break
        case '/404':
            view = '404.html'
            break
        default:
            view = '404.html'
            break
    }
    let html = await render(view)
    return html
}

app.use(async(ctx) => {
    let url = ctx.request.url
    let html = await router(url)
    ctx.body = html
})

app.listen(3000, () => {
    console.log('服务启动在3000端口')
})
