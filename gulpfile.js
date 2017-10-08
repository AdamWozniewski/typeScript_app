// var gulp = require('gulp');
// var path = require('path');
// var ts = require('gulp-typescript');
// var sourcemap = require("gulp-sourcemaps");
//
// gulp.task('build:server', function(){
//         var tsProject = ts.createProject(path.resolve('./server/tsconfig.json'));
//         var tsResult = gulp.src(['./server/**/*.ts'])
//             .pipe(sourcemap.init())
//             .pipe(ts(tsProject))
//         return tsResult.js.pipe(sourcemap.write())
//             .pipe(gulp.dest(
//                 path.resolve('./dist/server')
//             ));
// });
//
// gulp.task('build', ['build:server']);
// gulp.task('default',['build']);

eval(
    require('typescript').transpile(
        require('fs').readFileSync('./gulpclass.ts').toString()
    )
);