"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var gulp = require("gulp");
var gulpts = require("gulp-typescript");
var tsProject = gulpts.createProject("src/tsconfig.json");
gulp.task('copystatic', function () {
    gulp.src('**/*', { base: "./src/public" }).pipe(gulp.dest('dist/public'));
});
gulp.task('compilets', function () {
    return tsProject.src()
        .pipe(tsProject())
        .js.pipe(gulp.dest("dist"));
});
gulp.task('default', ['compilets', 'copystatic']);
