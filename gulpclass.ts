import {Gulpclass, Task, SequenceTask} from "gulpclass/Decorators";

let del = require('del');
let gulp = require('gulp');
let path = require('path');
let ts = require('gulp-typescript');
let sourcemap = require("gulp-sourcemaps");

@Gulpclass()
export class Gulpfile {

    @Task()
    clean(cb: Function) {
    return
        del(['./dist/**'], cb);
    }

    @Task("build:server")
    buildServer() {
        var tsProject = ts.createProject(path.resolve('./server/tsconfig.json'));
        var tsResult = gulp.src(['./server/**/*.ts'])
            .pipe(sourcemap.init())
            .pipe(ts(tsProject))
        return tsResult.js.pipe(sourcemap.write())
            .pipe(gulp.dest(
                path.resolve('./dist/server')
            ));
    }

    @Task("copy:client")
    copyCLient(){
        return gulp.src(['./client/system.config.js']).pipe(gulp.dest(
            path.resolve('./dist/server')
        ))
    }

    @Task("build:client")
    buildClient() {
        var tsProject = ts.createProject(path.resolve('./client/tsconfig.json'));
        var tsResult = gulp.src(['./client/**/*.ts'])
            .pipe(sourcemap.init())
            .pipe(ts(tsProject))
        return tsResult.js.pipe(sourcemap.write())
            .pipe(gulp.dest(
                path.resolve('./dist/client')
            ));
    }

    @SequenceTask()
    default(){
        return ['clean', 'build:server', 'build:client'];
    }
}
