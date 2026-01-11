// /* eslint-disable */
// const express = require('express')
// const fs = require('fs')
// const path = require('path')
// process.env.SSR = 'true'
// // CommonJS 服务端 bundle 导入
// const pkg = require('./dist-ssr/server/entry-server.js')
// const render = pkg.render

// const server = express()
// // 静态资源
// server.use(express.static(path.resolve(__dirname, 'dist-ssr/client')))

// // 所有请求走 SSR
// server.get('/.*', async (req, res) => {
//   try {
//     const template = fs.readFileSync(path.resolve(__dirname, 'dist-ssr/client/index.html'), 'utf-8')
//     const appHtml = await render(req.url)
//     const html = template.replace('<!--app-html-->', appHtml)
//     res.setHeader('Content-Type', 'text/html')
//     res.end(html)
//   } catch (err) {
//     console.error(err)
//     res.status(500).send('SSR Error')
//   }
// })

// server.listen(8000, () => {
//   console.log('SSR server running at http://localhost:8000')
// })
/* eslint-disable */
/* eslint-disable */
const express = require('express')
const fs = require('fs')
const path = require('path')

process.env.SSR = 'true'

const server = express()

// 静态资源
server.use(express.static(path.resolve(__dirname, 'dist-ssr/client')))

async function start() {
  // 动态 import SSR bundle（兼容 ESM）
  const { render } = await import('./dist-ssr/server/entry-server.mjs')

  server.use(async (req, res, next) => {
    try {
      const templatePath = path.resolve(__dirname, 'dist-ssr/client/indexSSR.html')
      const template = fs.readFileSync(templatePath, 'utf-8') // ✅ 确保 utf-8
      const appHtml = await render(req.url)

      const html = template.replace('<!--app-html-->', appHtml)

      // ✅ 设置响应头，保证中文不乱码
      res.setHeader('Content-Type', 'text/html; charset=utf-8')
      res.end(html)
    } catch (err) {
      console.error(err)
      res.status(500).send('SSR Error')
    }
  })

  const port = process.env.PORT || 8000
  server.listen(port, () => {
    console.log(`SSR server running at http://localhost:${port}`)
  })
}

start()