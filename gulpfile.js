let gulp = require('gulp'),
    browserSync = require('browser-sync').create(),
    less = require('gulp-less'),
    plumber = require('gulp-plumber'),
    autoprefixer = require('gulp-autoprefixer'),
    babel = require('gulp-babel');
    

  // main style
function style() {
  return gulp.src('src/less/style.less')
     .pipe(plumber())
     .pipe(less())
     .pipe(autoprefixer({
        browsers: ['last 4 versions']
     }))
     .pipe(gulp.dest('build/css/'))
     .pipe(browserSync.stream());
}

// responsive style
function responsive() {
  return gulp.src('src/less/responsive.less')
     .pipe(plumber())
     .pipe(less())
     .pipe(autoprefixer({
        browsers: ['last 4 versions']
     }))
     .pipe(gulp.dest('build/css/'))
     .pipe(browserSync.stream());
}

// babel
function mainJs() {
  return gulp.src('src/js/main.js')
     .pipe(babel({
        presets: ['@babel/env']
     }))
     .pipe(gulp.dest('build/js/'));
}

// browser sync
function browser_sync() {
  browserSync.init({
     server: {
        baseDir: "build/"
     },
     notify: false,
     open: false,
     port: 3000
  });
}

// watch files
function watchFiles() {
  gulp.watch(['src/less/**/*.less', '!src/less/responsive.less'], style);
  gulp.watch('src/less/responsive.less', responsive);
  gulp.watch('build/*.html').on('change', browserSync.reload);
  gulp.watch(['src/js/main.js'], mainJs).on('change', browserSync.reload);
}

// build
exports.build = gulp.series(
  style,
  responsive,
  mainJs
);

// watch
exports.watch = gulp.parallel(
  browser_sync,
  watchFiles
);


// gulp.task('main-style', function() {
//   return gulp.src('less/style.less')
//     .pipe(plumber())
//     .pipe(less())
//     .pipe(gulp.dest('assets'))
//     .pipe(browserSync.stream());
// });

// gulp.task('responsive-style', function() {
//   return gulp.src('less/responsive.less')
//     .pipe(plumber())
//     .pipe(less())
//     .pipe(gulp.dest('assets'))
//     .pipe(browserSync.stream());
// });

// gulp.task('autoprefixer', function() {
//   return gulp.src(['assets/style.css', 'assets/responsive.css'])
//     .pipe(autoprefixer({
//       browsers: ['last 2 versions']
//     }))
//     .pipe(gulp.dest('assets'));
// });

// gulp.task('browser-sync', function() {
//   browserSync.init({
//     server: {
//       baseDir: './'
//     },
//     notify: false,
//     open: false
//   });
// });

// gulp.task('es6', function() {
//   return gulp.src('js/src-js/common.js')
//     .pipe(babel({
//       presets: ['@babel/env']
//     }))
//     .pipe(gulp.dest('js'));
// });


// gulp.task('run', [
//   'main-style', 
//   'responsive-style', 
//   'browser-sync',
//   'autoprefixer',
//   'es6'
//   ], function() {
//   gulp.watch('less/style.less', ['main-style']);
//   gulp.watch('less/responsive.less', ['responsive-style']);
//   gulp.watch('**/*.html').on('change', browserSync.reload);
//   gulp.watch('js/common.js').on('change', browserSync.reload);
// });
