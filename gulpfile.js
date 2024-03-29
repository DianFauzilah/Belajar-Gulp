var gulp = require('gulp');
var gulpMinifyCss = require('gulp-minify-css');
var gulpConcat = require('gulp-concat');
var gulpUglify = require('gulp-uglify');
var gulpHtmlmin = require('gulp-htmlmin');
var gulpConnect = require('gulp-connect');
var clean = require('gulp-clean');
var gulpSequence = require('gulp-sequence');


gulp.task('minify-css', function() {
  gulp.src('./src/index.css')
    .pipe(gulpMinifyCss({
      compatibility: 'ie8'
    }))
    .pipe(gulp.dest('./dist/css'));
});

// gulp.task('minify-css', done=> {
//   gulp.src('./src/index.css')
//     .pipe(gulpMinifyCss({
//       compatibility: 'ie8'
//     }))
//     .pipe(gulp.dest('./dist/'));

//     done();
// });


gulp.task('minify-js', function() {
  gulp
    .src([
      './js/index1.js'
    ])
    .pipe(gulpConcat('bundle.js'))
    .pipe(gulpUglify())
    .pipe(gulp.dest('dist/js'));
});

var gulp = require('gulp');


gulp.task('minify-html', function() {
  gulp.src('*.html')
    .pipe(gulpHtmlmin({
      collapseWhitespace: true
    }))
    .pipe(gulp.dest('dist'))
});


gulp.task('server', function() {
  gulpConnect.server({
    root: 'src',
    livereload: true
  });
});

gulp.task('watch', function() {
  gulp.watch('./src/*.js', ['minify-js']);
  gulp.watch('./src/*.css', ['minify-css']);
  gulp.watch('./src/*.html', ['minify-html']);
});

gulp.task('default', ['watch', 'server']);


gulp.task('clean', function() {
  return gulp.src('dist', {
    read: false
  })
    .pipe(clean());
});

gulp.task('build', gulpSequence('clean', 'minify-css', 'minify-js', 'minify-html'));