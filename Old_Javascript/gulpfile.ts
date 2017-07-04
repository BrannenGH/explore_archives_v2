import * as gulp from 'gulp';
import * as gulpts from 'gulp-typescript';

var tsProject = gulpts.createProject("src/tsconfig.json");
var tsStart = gulpts.createProject("./tsconfig.json")

gulp.task('compileapp',function(){
    return tsProject.src()
        .pipe(tsProject())
        .js.pipe(gulp.dest("dist"));
});

gulp.task('compileacc', function(){
    return tsStart.src()
        .pipe(tsStart()).
        js.pipe(gulp.dest("./"));
});

gulp.task('default',['compileapp','compileacc']);

