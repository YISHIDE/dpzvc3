import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

// ESM 下模拟 __dirname
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// 当前 app 项目根目录（apps/uniapp-vue3）
const appRoot = process.cwd()

// ⭐ 关键：uni-app CLI 只扫描 src/uni_modules
const appUniModules = path.join(appRoot, 'src/uni_modules')

// 组件库里的 uni_modules
const libModules = path.resolve(__dirname, '../uni_modules')

if (!fs.existsSync(libModules)) {
  console.error('❌ dpzvc3-ui uni_modules not found:', libModules)
  process.exit(1)
}

// 确保 src/uni_modules 存在
fs.mkdirSync(appUniModules, { recursive: true })

for (const mod of fs.readdirSync(libModules)) {
  const from = path.join(libModules, mod)
  const to = path.join(appUniModules, mod)

  if (fs.existsSync(to)) {
    console.log(`↪ ${mod} already linked`)
    continue
  }

  fs.symlinkSync(from, to, 'junction')
  console.log(`✅ linked ${mod} → src/uni_modules`)
}