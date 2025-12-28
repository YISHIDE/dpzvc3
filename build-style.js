const gulp = require('gulp');
const less = require('gulp-less');
const cleanCSS = require('gulp-clean-css');
const rename = require('gulp-rename');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const { deleteAsync } = require('del'); // 新增

// 清空 dist 目录
function clean() {
  return deleteAsync(['./dist/**', '!./dist']); // 删除 dist 下所有文件和子目录，但保留 dist 目录本身
}

// 打包组件 CSS
function componentsCSS() {
  return gulp.src('./src/styles/components/*.less')
    .pipe(less())
    .pipe(postcss([autoprefixer()]))
    .pipe(cleanCSS({ compatibility: 'ie8' }))
    .pipe(rename({ dirname: '', extname: '.css' }))
    .pipe(gulp.dest('./dist/styles/components'));
}

// 打包 base CSS
function baseCSS() {
  return gulp.src('./src/styles/base/*.less')
    .pipe(less())
    .pipe(postcss([autoprefixer()]))
    .pipe(cleanCSS({ compatibility: 'ie8' }))
    .pipe(rename({ dirname: '', extname: '.css' }))
    .pipe(gulp.dest('./dist/styles/base'));
}

// 打包 utils CSS
function utilsCSS() {
  return gulp.src('./src/styles/utils/*.less')
    .pipe(less())
    .pipe(postcss([autoprefixer()]))
    .pipe(cleanCSS({ compatibility: 'ie8' }))
    .pipe(rename({ dirname: '', extname: '.css' }))
    .pipe(gulp.dest('./dist/styles/utils'));
}

// 打包全局 index.less
function globalCSS() {
  return gulp.src('./src/styles/index.less')
    .pipe(less())
    .pipe(postcss([autoprefixer()]))
    .pipe(cleanCSS({ compatibility: 'ie8' }))
    .pipe(rename('dpzvc3.css'))
    .pipe(gulp.dest('./dist/styles'));
}

// 默认任务：先清空 dist，再并行打包所有 CSS
exports.default = gulp.series(
  clean,
  gulp.parallel(globalCSS, componentsCSS, baseCSS, utilsCSS)
);