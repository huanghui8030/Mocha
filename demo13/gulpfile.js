/**
 * gulp配置文件，整合css/js/images等自动化插件
 * huangh@chsi.com.cn 20170918
 */
var gulp = require('gulp'),                     //本地安装gulp所用到的地方
    less = require('gulp-less'),                //less文件转为css
    autoprefixer = require('gulp-autoprefixer'),//css添加厂商前缀
    rename = require('gulp-rename'),            //重命名
    concatCss = require('gulp-concat-css'),
    watch = require('gulp-watch'),              //即时编译
    assetRev = require('gulp-chsi-rev'),	      //添加版本号
    concat = require('gulp-concat'),             //js合并
    uglify = require('gulp-uglify'),             //js压缩
    clean = require('gulp-clean'),               //删除文件，做操作前先删除文件
    imgmin = require('gulp-imagemin'),         //图片压缩    
    cssnano = require('gulp-cssnano'),   //合并重复的css
    mocha = require('gulp-mocha'),       ///单元测试
    
    ArrAll = {     
        lessDir: 'css/less',//需要解析的less文件目录
        cssDir : 'css/custom',       //需要解析的less文件目录
        jsSrc  : 'js/common',         //js目录
        jsTest : 'js/test/',          //单元测试目录
        imgSrc : 'images'   //原图片路径
    };   

//mocha
gulp.task('mocha', function() {
  return gulp.src(ArrAll.jsTest+['/*.test.js'], { read: false })
    .pipe(mocha({reporter: 'list'}))
});

//即时编译文件文件
gulp.task('watch',function(){
  gulp.watch(ArrAll.jsTest+['/*.test.js'],['mocha']);   
});

//默认任务
gulp.task('default',function(){
	gulp.start(['mocha','watch']);
});












