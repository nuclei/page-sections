'use strict'
/* ---------- */
/* setup */
const gulp = require('gulp')
const sourcemaps = require('gulp-sourcemaps')
const babel = require('gulp-babel')
const webmake = require('gulp-webmake')

gulp.task('js', () => {
  gulp.src([
    'src/page-sections.js'
  ])
  .pipe(webmake())
  .pipe(babel({
    presets: ['latest'],
    plugins: ['transform-custom-element-classes']
  }))
  .pipe(sourcemaps.init({loadMaps: true}))
  .pipe(sourcemaps.write('.'))
  .pipe(gulp.dest('./dist'))
})

// gulp.task('js', () => {
//   return merge(['src/page-sections.js'].map(function (entry) {
//     return rollup({
//       entry: entry,
//       sourceMap: true,
//       plugins: [
//         commonjs({
//           // if true then uses of `global` won't be dealt with by this plugin
//           ignoreGlobal: false  // Default: false
//         })
//       ]
//     })
//     .pipe(source(path.resolve(entry), path.resolve('./src')))
//
//     // buffer the output. most gulp plugins, including gulp-sourcemaps, don't support streams.
//     .pipe(buffer())
//
//     // tell gulp-sourcemaps to load the inline sourcemap produced by rollup-stream.
//     .pipe(sourcemaps.init({loadMaps: true}))
//     .pipe(babel({
//       presets: ['latest'],
//       plugins: ['transform-custom-element-classes']
//     }))
//     // write the sourcemap alongside the output file.
//     .pipe(sourcemaps.write('.'))
//   }))
//   .pipe(gulp.dest('./dist'))
// })

// Rerun the task when a file changes
gulp.task('watch', function () {
  gulp.watch('src/*.js', ['js'])
})

gulp.task('default', ['js', 'watch'])
