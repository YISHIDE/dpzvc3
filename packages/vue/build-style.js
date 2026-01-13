/* eslint-disable */
const gulp = require('gulp')
const less = require('gulp-less')
const cleanCSS = require('gulp-clean-css')
const rename = require('gulp-rename')
const postcss = require('gulp-postcss')
const autoprefixer = require('autoprefixer')
const { deleteAsync } = require('del')
const path = require('path')

// 项目 src 根目录
const SRC_ROOT = path.resolve(__dirname, 'src')

// 清空 dist
function clean() {
  return deleteAsync(['./dist/**', '!./dist'])
}

// 核心：自定义 less 文件解析器（alias 真·正解）
function compileLess(src, dest, renameOptions) {
  let stream = gulp
    .src(src)
    .pipe(
      less({
        // less 原生选项
        filename: src,
        paths: [SRC_ROOT],

        // 👇 关键：拦截 import 解析
        plugins: [{
          install(lessInstance, pluginManager) {
            const FileManager = lessInstance.FileManager

            class AliasFileManager extends FileManager {
              loadFile(filename, currentDirectory, options, environment, callback) {
                // 处理 @/ 开头
                if (filename.startsWith('@/')) {
                  const realPath = path.join(
                    SRC_ROOT,
                    filename.replace('@/', '')
                  )
                  return super.loadFile(realPath, '', options, environment, callback)
                }
                return super.loadFile(filename, currentDirectory, options, environment, callback)
              }
            }

            pluginManager.addFileManager(new AliasFileManager())
          }
        }]
      })
    )
    .pipe(postcss([autoprefixer()]))
    .pipe(cleanCSS({ compatibility: 'ie8' }))

  if (renameOptions) {
    stream = stream.pipe(rename(renameOptions))
  }

  return stream.pipe(gulp.dest(dest))
}

// components
function componentsCSS() {
  return compileLess(
    './src/styles/components/*.less',
    './dist/styles/components',
    { dirname: '', extname: '.css' }
  )
}

// base
function baseCSS() {
  return compileLess(
    './src/styles/base/*.less',
    './dist/styles/base',
    { dirname: '', extname: '.css' }
  )
}

// utils
function utilsCSS() {
  return compileLess(
    './src/styles/utils/*.less',
    './dist/styles/utils',
    { dirname: '', extname: '.css' }
  )
}

// global
function globalCSS() {
  return compileLess(
    './src/styles/index.less',
    './dist/styles',
    'dpzvc3.css'
  )
}

exports.default = gulp.series(
  clean,
  gulp.parallel(
    globalCSS,
    componentsCSS,
    baseCSS,
    utilsCSS
  )
)