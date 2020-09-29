# Gulp项目自动化构建

```
|-- 环境准备  
    | --初始化项目
|-- gulp配置文件
    |-- gulpfile.js

```

## 环境准备 
***初始化项目***
1. yarn add global gulp 构建工具
2. yarn add del  -D  删除文件
3. yarn add browser-sync -D 本地web应用插件
3. yarn add gulp-load-plugins -D 插件集中加载
4. yarn add @babel/core @babel/preset-env gulp-babel //es6 js处理插件
5. yarn add gulp-clean-css css压缩插件
6. yarn add gulp-htmlmin html 压缩插件
7. yarn add gulp-imagemin -D 图片压缩插件
8. yarn add gulp-uglify -D js压缩
9. yarn add gulp-useref -D html中将第三方的包打包进vendor.js
10. yarn add gulp-swig -D 将data注入模板

## gulp配置文件
***gulpfile.js***
1. 编译过程：
- 将scss文件编译成css文件放入temp临时文件  
- 将js文件编译成ecmascript 5 文件放入temp临时文件  
- 将数据注入模板文件后放入临时文件  
2. web服务器启动过程：
- 利用watch监听scss,js,html源文件的变化，在文件变化后重新刷新页面
- 启动服务器
3. 构建打包：
- 编译过程之后在temp文件夹中，用useref插件，将第三方中的包打包进vendor,同时压缩js.css.html文件
- useref处理后的包放入dist,同时将image,font,public等静态文件打包入dist
- 完成构建过程
