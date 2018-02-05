var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sh = require('shelljs');
var karma = require('karma').server;
var plato = require('plato');

var paths = {
  sass: ['./scss/**/*.scss']
};

var files = ['./www/app/modules/about/controllers/*.js',
              './www/app/modules/about/services/*.js',
              './www/app/modules/account/controllers/*.js',
              './www/app/modules/account/services/*.js',
              './www/app/modules/celebirty/controllers/*.js',
              './www/app/modules/celebirty/services/*.js',
              './www/app/modules/contact/controllers/*.js',
              './www/app/modules/contact/services/*.js',
              './www/app/modules/fanof/controllers/*.js',
              './www/app/modules/fanof/services/*.js',
              './www/app/modules/home/controllers/*.js',
              './www/app/modules/home/services/*.js',
              './www/app/modules/myFan/controllers/*.js',
              './www/app/modules/myFan/services/*.js',
              './www/app/modules/profile/controllers/*.js',
              './www/app/modules/profile/services/*.js',
              './www/app/modules/shared/controllers/*.js',
              './www/app/modules/shared/services/*.js',
              './www/app/modules/user/controllers/*.js',
              './www/app/modules/user/services/*.js'
            ];

var platoOptions = {
  jshint: {
    options: {
      strict: false
    }
  },
  complexity: {
    trycatch: true
  }
};

gulp.task('default', ['sass','test', 'generate-report']);

gulp.task('sass', function(done) {
  gulp.src('./scss/ionic.app.scss')
    .pipe(sass())
    .on('error', sass.logError)
    .pipe(gulp.dest('./www/css/'))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('./www/css/'))
    .on('end', done);
});

gulp.task('watch', function() {
  gulp.watch(paths.sass, ['sass']);
});

gulp.task('install', ['git-check'], function() {
  return bower.commands.install()
    .on('log', function(data) {
      gutil.log('bower', gutil.colors.cyan(data.id), data.message);
    });
});

gulp.task('git-check', function(done) {
  if (!sh.which('git')) {
    console.log(
      '  ' + gutil.colors.red('Git is not installed.'),
      '\n  Git, the version control system, is required to download Ionic.',
      '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
      '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
    );
    process.exit(1);
  }
  done();
});

// gulp.task('generate-report', function() {
//   gulp.src(['./www/app/modules/about/controllers/*.js', './www/app/modules/about/services/*.js','./www/app/modules/account/controllers/*.js', './www/app/modules/account/services/*.js','./www/app/modules/celebirty/controllers/*.js', './www/app/modules/celebirty/services/*.js', './www/app/modules/contact/controllers/*.js', './www/app/modules/contact/services/*.js','./www/app/modules/fanof/controllers/*.js', './www/app/modules/fanof/services/*.js','./www/app/modules/home/controllers/*.js', './www/app/modules/home/services/*.js','./www/app/modules/myFan/controllers/*.js', './www/app/modules/myFan/services/*.js', './www/app/modules/profile/controllers/*.js', './www/app/modules/profile/services/*.js', './www/app/modules/shared/controllers/*.js', './www/app/modules/shared/services/*.js', './www/app/modules/user/controllers/*.js', './www/app/modules/user/services/*.js'])
//     .pipe(plato('./reports/complexity', platoOptions));
// });

gulp.task('generate-report', function(){
  plato.inspect(files, "./reports/complexity", platoOptions, function(e){
    
  })
})

gulp.task('test', function(done) {
    karma.start({
        configFile: __dirname + '/tests/karma.conf.js',
        singleRun: true
    }, function() {
        done();
    });
});
