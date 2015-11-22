/**
 * Created by wanglei on 2015/11/22.
 */

var gulp = require("gulp"),                         //基础库
    imagemin = require("gulp-imagemin"),            //图片压缩
    jshint = require("gulp-jshint"),                //js检查
    concat = require("gulp-concat"),
    minifycss = require('gulp-minify-css'),         //css压缩
    uglify = require("gulp-uglify"),                //js压缩
    imgmin = require("gulp-tinyimg"),               //图片压缩
    rename = require("gulp-rename"),                 //重命名
    notify = require("gulp-notify");                 //命令执行完成提示


//js 压缩
    gulp.task("jsmin",function(){
        var jsSrc = "./js/main.js",
            jsDst = "./dist/js";
        gulp.src(jsSrc)
            .pipe(concat("main.js"))
            .pipe(gulp.dest(jsDst))
            .pipe(rename({suffix:".min"}))
            .pipe(uglify())
            .pipe(gulp.dest("./js"))
            .pipe(notify("js压缩完成！！"))
    });

//css 压缩

    gulp.task("cssmin",function(){
       var cssSrc = './css/*.css',
           jsDst = "./dist/css";
        gulp.src(cssSrc)
            .pipe(concat("main.css"))
            .pipe(gulp.dest(jsDst))
            .pipe(rename({suffix:".min"}))
            .pipe(minifycss())
            .pipe(gulp.dest("./css"))
            .pipe(notify("css压缩完成！！"))
    });

//图片压缩

//gulp 监听默认

    gulp.task("default",function() {
        gulp.run("jsmin");
        gulp.watch('./js/*.js',function(){
            gulp.run("jsmin");
        });
    });




