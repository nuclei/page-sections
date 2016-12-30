'use strict';
/* ---------- */
/* setup */
const gulp = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');
// const rollup = require('gulp-rollup');
const rollup = require('rollup-stream');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');

gulp.task('default', () => {
    // return gulp.src('src/page-section.js')
    //     .pipe(sourcemaps.init())
    //     .pipe(rollup())
    //     .pipe(babel({
    //         presets: ['latest'],
    //         plugins: ["transform-custom-element-classes"]
    //     }))
    //     .pipe(sourcemaps.write('.'))
    //     .pipe(gulp.dest('dist'));
        return rollup({
          entry: 'src/page-sections.js',
          sourceMap: true
        })

        // point to the entry file.
        .pipe(source('page-sections.js', 'src/'))

        // buffer the output. most gulp plugins, including gulp-sourcemaps, don't support streams.
        .pipe(buffer())

        // tell gulp-sourcemaps to load the inline sourcemap produced by rollup-stream.
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(babel({
            presets: ['latest'],
            plugins: ["transform-custom-element-classes"]
        }))
            // transform the code further here.

        // if you want to output with a different name from the input file, use gulp-rename here.
        //.pipe(rename('index.js'))

        // write the sourcemap alongside the output file.
        .pipe(sourcemaps.write('.'))

        // and output to ./dist/main.js as normal.
        .pipe(gulp.dest('./dist'));
});
