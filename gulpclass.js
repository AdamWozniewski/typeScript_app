"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var Decorators_1 = require("gulpclass/Decorators");
var del = require('del');
var gulp = require('gulp');
var path = require('path');
var ts = require('gulp-typescript');
var sourcemap = require("gulp-sourcemaps");
var Gulpfile = (function () {
    function Gulpfile() {
    }
    Gulpfile.prototype.clean = function (cb) {
        return;
        del(['./dist/**'], cb);
    };
    Gulpfile.prototype.buildServer = function () {
        var tsProject = ts.createProject(path.resolve('./server/tsconfig.json'));
        var tsResult = gulp.src(['./server/**/*.ts'])
            .pipe(sourcemap.init())
            .pipe(ts(tsProject));
        return tsResult.js.pipe(sourcemap.write())
            .pipe(gulp.dest(path.resolve('./dist/server')));
    };
    Gulpfile.prototype.copyCLient = function () {
        return gulp.src(['./client/system.config.js']).pipe(gulp.dest(path.resolve('./dist/server')));
    };
    Gulpfile.prototype.buildClient = function () {
        var tsProject = ts.createProject(path.resolve('./client/tsconfig.json'));
        var tsResult = gulp.src(['./client/**/*.ts'])
            .pipe(sourcemap.init())
            .pipe(ts(tsProject));
        return tsResult.js.pipe(sourcemap.write())
            .pipe(gulp.dest(path.resolve('./dist/client')));
    };
    Gulpfile.prototype.default = function () {
        return ['clean', 'build:server', 'build:client'];
    };
    __decorate([
        Decorators_1.Task()
    ], Gulpfile.prototype, "clean", null);
    __decorate([
        Decorators_1.Task("build:server")
    ], Gulpfile.prototype, "buildServer", null);
    __decorate([
        Decorators_1.Task("copy:client")
    ], Gulpfile.prototype, "copyCLient", null);
    __decorate([
        Decorators_1.Task("build:client")
    ], Gulpfile.prototype, "buildClient", null);
    __decorate([
        Decorators_1.SequenceTask()
    ], Gulpfile.prototype, "default", null);
    Gulpfile = __decorate([
        Decorators_1.Gulpclass()
    ], Gulpfile);
    return Gulpfile;
}());
exports.Gulpfile = Gulpfile;
