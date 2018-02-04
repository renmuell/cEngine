import gulp           from 'gulp'
import babel          from 'gulp-babel'
import uglify         from 'gulp-uglify'
import rename         from 'gulp-rename'
import eslint         from 'gulp-eslint'
import replace        from 'gulp-replace'
import sourcemaps     from 'gulp-sourcemaps'
import browserify     from 'gulp-browserify'
import mochaPhantomJS from 'gulp-mocha-phantomjs'

// path

const path = {
  src : {
    cEngine  : './src/cEngine.js',
    plugins  : './src/plugins/**/*.js',
    example  : './example/**/*.*',
    test     : './test/**/*.js',
    testHtml : './test/**/*.html'
  },
  build : {
    src      : './build/src',
    plugins  : './build/src/plugins',
    example  : './build/example',
    test     : './build/test',
    testHtml : 'build/test/**/*.html'
  },
  release : {
    main    : './dist/',
    plugins : './dist/plugins'
  }
}

// Error

function onError(e) {
  console.error(e)
  this.emit('end')
}

// Build JS

gulp.task('build-js', ['build-js-main', 'build-js-plugins'])

gulp.task('build-js-main', () => 
  gulp.src(path.src.cEngine)
    .pipe(eslint())
    .pipe(eslint.formatEach())
//    .pipe(eslint.failAfterError())
    .pipe(babel())
    .pipe(browserify())
    .on('error', onError)
    .pipe(gulp.dest(path.build.src)))

gulp.task('build-js-plugins', () => 
  gulp.src(path.src.plugins)
    .pipe(eslint())
    .pipe(eslint.formatEach())
//    .pipe(eslint.failAfterError())
    .pipe(babel())
    .pipe(browserify())
    .on('error', onError)
    .pipe(gulp.dest(path.build.plugins)))

// Release JS

gulp.task('release-js', ['release-js-main', 'release-js-plugins'])

gulp.task('release-js-main', () => 
  gulp.src(path.src.cEngine)
    .on('error', onError)
    .pipe(babel())
    .pipe(browserify())
    .pipe(gulp.dest(path.release.main))
    .pipe(sourcemaps.init())
    .pipe(uglify())
    .pipe(rename({
        suffix: "-min"
      }))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(path.release.main)))

gulp.task('release-js-plugins', () => 
  gulp.src(path.src.plugins)
    .on('error', onError)
    .pipe(babel())
    .pipe(browserify())
    .pipe(gulp.dest(path.release.plugins))
    .pipe(sourcemaps.init())
    .pipe(uglify())
    .pipe(rename({
        suffix: "-min"
      }))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(path.release.plugins)))

// Copy Example to build

gulp.task('copy-example', () =>
    gulp.src(path.src.example)
        .pipe(replace(/\/release\//g, '/src/'))
        .pipe(gulp.dest(path.build.example)))

// Test

gulp.task('build-test', () =>
  gulp.src(path.src.test)
    .pipe(babel())
    .pipe(gulp.dest(path.build.test)))

gulp.task('copy-test', () => 
  gulp.src(path.src.testHtml)
      .pipe(gulp.dest(path.build.test)))

gulp.task('test', ['build-js', 'build-test', 'copy-test'], () => 
    gulp.src(path.build.testHtml)
        .pipe(mochaPhantomJS()))

// Watch

gulp.task('watch', ['build'], () => {
  gulp.watch(path.src.cEngine, ['build-js-main'])
  gulp.watch(path.src.plugins, ['build-js-plugins'])
  gulp.watch(path.src.example, ['copy-example'])
})

// ALL

gulp.task('default', ['build-js'])

gulp.task('build', ['copy-example', 'build-js'])

gulp.task('release', ['test', 'release-js'])
