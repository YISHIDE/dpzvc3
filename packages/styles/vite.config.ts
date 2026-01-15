import { defineConfig } from 'vite'
import path from 'path'
import fs from 'fs'



// 自动收集 components/*.less

type fileNameType = 'base' | 'components' | 'utils'
interface fileNameList {
    [k:string]:string
}
const styleCss = (fileName: fileNameType): fileNameList=> { 
const componentsDir = path.resolve(__dirname, `src/${fileName}`)
const componentEntries = Object.fromEntries(
  fs.readdirSync(componentsDir)
    .filter(file => file.endsWith('.less'))
    .map(file => [
      `${fileName}/${file.replace('.less', '')}`,
      path.join(componentsDir, file)
    ])
)
    return componentEntries
}
// console.log(styleCss('components'), 'components')

export default defineConfig({
  build: {
    outDir: 'dist',
    cssCodeSplit: true,
    emptyOutDir: true,

    lib: {
      entry: {
        index: path.resolve(__dirname, 'src/index.less'),
        ...styleCss('components'),
        ...styleCss('base'),
        ...styleCss('utils')
      },
      formats: ['es']
    },

        rollupOptions: {
            output: {
                assetFileNames: '[name].css'
            }
    //   output: {
    //     // 保留 components 目录结构
    //         assetFileNames: (assetInfo) => {
    //       if (assetInfo.name?.endsWith('.css')) {
    //         return '[name].css'
    //       }
    //       return 'assets/[name][extname]'
    //     }
    //   }
    }
  },

  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      }
    }
  }
})