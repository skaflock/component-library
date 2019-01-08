var gulp = require('gulp');
var fc2json = require('gulp-file-contents-to-json');
var jsonTree = require('gulp-json-tree');

gulp.task('fs2json', function (done) {
    gulp.src('components/**/*')
        .pipe(fc2json('contents.json'))
        .pipe(gulp.dest('./'));

    done();
});

gulp.task('jst', function (done) {
    gulp.src('components/**/*.json')
        .pipe(jsonTree({
            filename: 'components.json'
        }))
        .pipe(gulp.dest('./'));

    done();
});

gulp.task('watch', function (done) {
    gulp.watch([
        'components/**/*.json'
    ], gulp.series('jst'));

    done();
});

gulp.task('default', gulp.series(
    gulp.parallel('jst'),
    'watch'
));
