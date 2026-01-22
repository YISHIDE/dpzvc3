import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// 源：组件库自身维护的 uni_modules
const src = path.resolve(__dirname, '../uni_modules')

// 目标：npm 包发布根目录里的 uni_modules
const dest = path.resolve(__dirname, '../dist/uni_modules')

function copyDir(src, dest) {
  if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true })
  for (const name of fs.readdirSync(src)) {
    const s = path.join(src, name)
    const d = path.join(dest, name)
    if (fs.statSync(s).isDirectory()) {
      copyDir(s, d)
    } else {
      fs.copyFileSync(s, d)
    }
  }
}

if (!fs.existsSync(src)) {
  console.error('❌ uni_modules not found:', src)
  process.exit(1)
}

copyDir(src, dest)
console.log('✅ uni_modules prepared for npm publish')