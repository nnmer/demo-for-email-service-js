var gulp    = require('gulp');
var gutil   = require('gulp-util');
var gulpif  = require('gulp-if');
var nodemon = require('gulp-nodemon');
var ignore  = require('gulp-ignore');
var cssmin  = require('gulp-cssmin');
var concat  = require('gulp-concat');
var buffer  = require('vinyl-buffer');
var source  = require('vinyl-source-stream');
var babelify    = require('babelify');
var browserify  = require('browserify');
var watchify    = require('watchify');
var uglify      = require('gulp-uglify');
var sourcemaps  = require('gulp-sourcemaps');
var babel       = require('gulp-babel');
var livereactload = require('livereactload');
var Cache = require('gulp-file-cache');

var cache = new Cache();

var production = false;  //process.env.NODE_ENV === 'production';


var dependencies = [
    'react',
    'react-dom',
    'react-router',
];

gulp.task('copy-fonts-assets',function(){
    return gulp.src('./bower_components/bootstrap/fonts/*')
    // Pass in options to the task
        .pipe(gulp.dest('./client/fonts'));
});

gulp.task('compile-js-assets',function(){
    return gulp.src([
        ,'./bower_components/jquery/dist/jquery.js'
        ,'./bower_components/bootstrap/dist/js/bootstrap.js'
        ])
        .pipe(uglify())
        .pipe(concat('bundle.js'))
        .pipe(gulp.dest('./public/js'))
});

gulp.task('compile-css',function(){
    return gulp.src([
            // ,'./bower_components/bootstrap/dist/css/bootstrap.css'
            ,'./client/css/bootstrap-custom.css'
            ,'./client/css/custom.css'
        ])
        .pipe(cssmin())
        .pipe(concat('style.css'))
        .pipe(gulp.dest('./public/css'))
});

gulp.task('browserify',['compile-css','compile-js-assets','copy-fonts-assets'], function() {
    return browserify({ entries: 'src/client.jsx', extensions: ['.jsx', '.js'], debug: true })
        // .external(dependencies)
        .transform(babelify, { presets: ['es2015', 'react'] })
        .bundle()
        .pipe(source('app.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({ loadMaps: true }))
        // .pipe(ignore.exclude([ "**/*.map" ]))
        .pipe(gulpif(production, uglify({ mangle: false })))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('public/js'));
});


/*
 |--------------------------------------------------------------------------
 | Same as browserify task, but will also watch for changes and re-compile.
 |--------------------------------------------------------------------------
 */
gulp.task('browserify-watch',['compile-css','compile-js-assets'], function() {
    var bundler = watchify(browserify({ entries: 'client/client.jsx', extensions: ['.jsx', '.js'], debug: true }, watchify.args));
    // bundler.external(dependencies);
    bundler.transform(babelify, { presets: ['es2015', 'react'] });
    bundler.plugin(livereactload);
    bundler.on('update', rebundle);
    return rebundle();

    function rebundle() {
        var start = Date.now();
        return bundler.bundle()
            .on('error', function(err) {
                gutil.log(gutil.colors.red(err.toString()));
            })
            .on('end', function() {
                gutil.log(gutil.colors.green('Finished rebundling in', (Date.now() - start) + 'ms.'));
            })
            .pipe(source('app.js'))
            .pipe(buffer())
            .pipe(sourcemaps.init({ loadMaps: true }))
            .pipe(sourcemaps.write('.'))
            .pipe(gulp.dest('public/js/'));
    }
});


// https://github.com/JacksonGariety/gulp-nodemon#using-gulp-nodemon-with-react-browserify-babel-es2015-etc
gulp.task('compile', function () {
    var stream = gulp.src('./server/**/*.js')           // your ES2015 code
        .pipe(cache.filter())                           // remember files
        .pipe(babel({ presets: ['es2015', 'react'] }))  // compile new ones
        .pipe(cache.cache())                            // cache them
        .pipe(source('server.js'))
        .pipe(gulp.dest('./'));                         // write them
    return stream;                                      // important for gulp-nodemon to wait for completion
})

gulp.task('nodemon', function() {
    var stream = nodemon({
        script: './server.js'                           // run ES5 code
        , watch: './server'                               // watch ES2015 code
        , tasks: ['compile']                            // compile synchronously onChange
    })
        .on('restart', function () {
            console.log('restarted!')
        })

    return stream;
});

gulp.task('default', ['browserify-watch',  'nodemon']);