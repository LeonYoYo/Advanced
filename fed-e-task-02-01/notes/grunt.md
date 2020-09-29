# Grunt项目自动化构建

```
|-- 环境准备  
    | --初始化项目
|-- grunt配置文件
    |-- gruntfile.js
```

***初始化项目***
1. $ yarn add gulp -D 构建工具
2. $ yarn add browser-sync -D 本地web应用插件
3. $ yarn add load-grunt-tasks -D 自动加载所有grunt插件
4. $ yarn add grunt-babel @babel/core @babel/preset-env -D //es6 js处理插件
5. $ yarn add grunt-sass sass -D 处理sass
6. $ yarn add grunt-contrib-clean -D 清除
7. $ yarn add grunt-contrib-watch -D 监听文件变化
8. $ yarn add grunt-swig-templates -D 处理html模板预编译

***gruntfile.js***
1. 监听sass, js, html文件变化
2. grunt.initConfig初始化配置，设置输出文件，
3. grunt.registerTask注册默认任务
 
 