"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var gulp = require("gulp");
var gulpts = require("gulp-typescript");
var tsProject = gulpts.createProject("src/tsconfig.json");
var tsStart = gulpts.createProject("./tsconfig.json");
//gulp.task('copystatic',function(){
//    gulp.src('**/*',{base:"./src/public"}).pipe(gulp.dest('dist/public'));               
//});
gulp.task('compileapp', function () {
    return tsProject.src()
        .pipe(tsProject())
        .js.pipe(gulp.dest("dist"));
});
gulp.task('compileacc', function () {
    return tsStart.src()
        .pipe(tsStart()).
        js.pipe(gulp.dest("./"));
});
gulp.task('default', ['compileapp', 'compileacc']);
