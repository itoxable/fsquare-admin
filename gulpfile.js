/* jshint node:true */
'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var karma = require('karma').server;
var argv = require('yargs').argv;
var $ = require('gulp-load-plugins')();
var browserSync = require('browser-sync').create();
var url = require('url');
var proxy = require('proxy-middleware');

gulp.task('styles', function() {
    return gulp.src([
        'app/styles/app-blue.scss',
        'app/styles/app-green.scss',
        'app/styles/app-red.scss',
        'app/styles/app-purple.scss',
        'app/styles/app-grey.scss',
        'app/styles/app-cyan.scss',
        'app/styles/style.scss',
        ])
    .pipe($.plumber())
    .pipe($.sass())
    .pipe($.autoprefixer({browsers: ['last 1 version']}))
    .pipe(gulp.dest('dist/styles'))
    .pipe(gulp.dest('.tmp/styles'));
});

gulp.task('jshint', function() {
    return gulp.src('app/scripts/**/*.js')
    .pipe($.jshint())
//.pipe($.jshint.reporter('jshint-stylish'))
//.pipe($.jshint.reporter('fail'));
});

gulp.task('jscs', function() {
    return gulp.src('app/scripts/**/*.js')
    .pipe($.jscs());
});

gulp.task('html', ['styles'], function() {
    var lazypipe = require('lazypipe');
    var cssChannel = lazypipe()
    .pipe($.csso)
    .pipe($.replace, 'bower_components/bootstrap/fonts', 'fonts');

    var assets = $.useref.assets({searchPath: '{.tmp,app}'});

    return gulp.src('app/**/*.html')
    .pipe(assets)
    .pipe($.if('*.js', $.ngAnnotate()))
    .pipe($.if('*.js', $.uglify()))
    .pipe($.if('*.css', cssChannel()))
    .pipe(assets.restore())
    .pipe($.useref())
    .pipe($.if('*.html', $.minifyHtml({conditionals: true, loose: true})))
    .pipe(gulp.dest('dist'));
});

gulp.task('images', function() {
    return gulp.src('app/images/**/*')
// .pipe($.cache($.imagemin({
//   progressive: true,
//   interlaced: true
// })))
.pipe(gulp.dest('dist/images'));
});

gulp.task('lang', function() {
    return gulp.src('app/languages/**/*')
    .pipe(gulp.dest('dist/languages'));
});

gulp.task('fonts', function() {
    return gulp.src(require('main-bower-files')().concat('app/styles/fonts/**/*')
        .concat('bower_components/bootstrap/fonts/*'))
    .pipe($.filter('**/*.{eot,svg,ttf,woff,woff2}'))
    .pipe($.flatten())
    .pipe(gulp.dest('dist/fonts'))
    .pipe(gulp.dest('.tmp/fonts'));
});

gulp.task('extras', function() {
    return gulp.src([
        'app/*.*',
        '!app/*.html',
        'node_modules/apache-server-configs/dist/.htaccess'
        ], {
            dot: true
        }).pipe(gulp.dest('dist'));
});

gulp.task('clean', require('del').bind(null, ['.tmp', 'dist']));


var proxyOptionsLiferay = url.parse('http://localhost:8080');
proxyOptionsLiferay.route = '/liferay';

gulp.task('connect', ['styles'], function() {
  browserSync.init({
    server:{
      baseDir: ["app", ".tmp", "./"],
      middleware: [
        proxy(proxyOptionsLiferay)
      ]
    }
  });

});

gulp.task('serve', ['wiredep', 'connect', 'fonts', 'lang', 'watch'], function() {
    /*if (argv.open) {
        require('opn')('http://localhost:9000');
    }*/
});

gulp.task('test', function(done) {
    karma.start({
        configFile: __dirname + '/test/karma.conf.js',
        singleRun: true
    }, done);
});

// inject bower components
gulp.task('wiredep', function() {
    var wiredep = require('wiredep').stream;
    var exclude = [
    'bootstrap',
    'jquery',
    'es5-shim',
    'json3',
    'angular-scenario',
    'require'
    ];

    gulp.src('app/styles/*.scss')
    .pipe(wiredep())
    .pipe(gulp.dest('app/styles'));

    gulp.src('app/*.html')
    .pipe(wiredep({exclude: exclude}))
    .pipe(gulp.dest('app'));

    gulp.src('test/*.js')
    .pipe(wiredep({exclude: exclude, devDependencies: true}))
    .pipe(gulp.dest('test'));
});

gulp.task('watch', ['connect'], function() {
    $.livereload.listen();

    // watch for changes
    gulp.watch([
        'app/**/*.html',
        '.tmp/styles/**/*.css',
        'app/scripts/**/*.js',
        'app/images/**/*'
        ]).on('change', browserSync.reload);

    gulp.watch('app/styles/**/*.scss', ['styles']);
    gulp.watch('bower.json', ['wiredep']);

});

gulp.task('builddist', ['jshint', 'html', 'images', 'lang', 'fonts', 'extras', 'styles'], function() {
    return gulp.src('dist/**/*').pipe($.size({title: 'build', gzip: true}));
});

gulp.task('build', ['clean'], function() {
    gulp.start('builddist');
});

gulp.task('docs', [], function() {
    return gulp.src('app/scripts/**/**')
    .pipe($.ngdocs.process())
    .pipe(gulp.dest('./docs'));
});

gulp.task('default', ['serve']);
angular-nestable