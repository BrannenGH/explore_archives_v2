import * as gulp from 'gulp';
import * as gulpts from 'gulp-typescript';

var tsProject = gulpts.createProject("src/tsconfig.json");

gulp.task('copystatic',function(){
    return gulp.src('src/public').pipe(gulp.dest('dist/public'));               
});

gulp.task('compilets',function(){
    return tsProject.src()
        .pipe(tsProject())
        .js.pipe(gulp.dest("dist"));
});

gulp.task('default',['compilets','copystatic']);

