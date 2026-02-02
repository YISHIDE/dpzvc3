import fs from 'fs'
import path from 'path'
import express from 'express'
import { createServer as createViteServer } from 'vite'

async function createServer() {
  const app = express()

  // 1️⃣ 创建 Vite Dev Server，middleware 模式
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'custom', // 不用默认 Vite HTML
  })

  // 2️⃣ 使用 Vite 中间件
  app.use(vite.middlewares)

  // 3️⃣ SSR fallback 路由（匹配所有请求）
  app.all(/^(.*)$/, async (req, res) => {
    try {
      const url = req.originalUrl

      // 3a️⃣ 读取原始 indexSSR.html
      let template = fs.readFileSync(
        path.resolve('indexSSR.html'),
        'utf-8'
      )

      // 3b️⃣ Vite 注入 HMR、env
      template = await vite.transformIndexHtml(url, template)

      // 3c️⃣ 动态加载 SSR 模块，每次都是最新代码
      const { render } = await vite.ssrLoadModule('/src/entry-server.ts')

      // 3d️⃣ 调用 render 方法，生成 HTML
      // const appHtml = await render(url)
          const { appHtml, skeletonHtml, skeletonStyle } =
    await render(req.url)

      // 3e️⃣ 注入 HTML
    const html = template
    .replace('<!--skeleton-style-->', `<style>${skeletonStyle}</style>`)
    .replace('<!--skeleton-->', skeletonHtml)
    .replace('<!--ssr-outlet-->', appHtml)

      res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
    } catch (e) {
      // Vite SSR 调试栈处理
      vite.ssrFixStacktrace(e)
      console.error(e)
      res.status(500).end(e.message)
    }
  })

  // 4️⃣ 启动开发服务器
  const port = 3000
  app.listen(port, () => {
    console.log(`🚀 SSR dev server running at http://localhost:${port}`)
  })
}

// 启动
createServer()