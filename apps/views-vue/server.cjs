// const express = require('express')
// const fs = require('fs')
// const path = require('path')
// process.env.SSR = 'true'
// const pkg = require('./dist-ssr/server/entry-server.cjs')
// // import { renderHeadToString } from '@vueuse/head'
// const render = pkg.render

// const server = express()

// // 静态资源
// server.use(express.static(path.resolve(__dirname, 'dist-ssr/client')))

// function start() {
//   // 动态 import SSR bundle（兼容 ESM）

//   server.use(async (req, res, next) => {
//     try {
//       const templatePath = path.resolve(__dirname, 'dist-ssr/client/indexSSR.html')
//       const template = fs.readFileSync(templatePath, 'utf-8') // ✅ 确保 utf-8
//       const appHtml = await render(req.url)

//       const html = template.replace('<!--app-html-->', appHtml)
//       // console.log(html, 'html')
//       // ✅ 设置响应头，保证中文不乱码
//       res.setHeader('Content-Type', 'text/html')
//       res.end(html)
//     } catch (err) {
//       console.error(err)
//       res.status(500).send('SSR Error')
//     }
//   })

//   const port = process.env.PORT || 8000
//   server.listen(port, () => {
//     console.log(`SSR server running at http://localhost:${port}`)
//   })
// }

// start()


const express = require('express')
const fs = require('fs')
const path = require('path')
process.env.SSR = 'true'
const pkg = require('./dist-ssr/server/entry-server.cjs')
// import { renderHeadToString } from '@vueuse/head'
const render = pkg.render

const server = express()

// 静态资源
server.use(express.static(path.resolve(__dirname, 'dist-ssr/client')))

function start() {
  // 动态 import SSR bundle（兼容 ESM）

  server.use(async (req, res, next) => {
    try {
      const templatePath = path.resolve(__dirname, 'dist-ssr/client/indexSSR.html')
      const template = fs.readFileSync(templatePath, 'utf-8') // ✅ 确保 utf-8
      // const appHtml = await render(req.url)
       const { appHtml, skeletonHtml, skeletonStyle } =
    await render(req.url)
    const html = template
    .replace('<!--skeleton-style-->', `<style>${skeletonStyle}</style>`)
    .replace('<!--skeleton-->', skeletonHtml)
    .replace('<!--ssr-outlet-->', appHtml)
      // const html = template.replace('<!--app-html-->', appHtml)

      console.log(html, 'html')
      // ✅ 设置响应头，保证中文不乱码
    res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
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

