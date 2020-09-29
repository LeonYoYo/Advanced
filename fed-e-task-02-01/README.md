## 简答题
##### 1、谈谈你对工程化的初步认识，结合你之前遇到过的问题说出三个以上工程化能够解决问题或者带来的价值。
工程化的即通过一种高效率、低成本、保证质量为目的的方式完成项目开发。

工程化解决的问题：
  * 解决项目中引入ES6、SASS、LESS、PostCss等工具的使用问题
  * 解决了无法使用模块化、组件化的弊端, 提高了代码的可维护性
  * 解决部署上线打包上传都必须手动上传代码，重复的机械式工作
  * 工程化屏蔽了一些环境的细节, (部分)统一了语言环境, 解决项目中代码风格、质量不统一的问题
  * 解决前端调试过程依赖后端项目进度


##### 2、你认为脚手架除了为我们创建项目结构，还有什么更深的意义？

* 脚手架的意义在于提供了一套前端项目开发的环境，本质上是为了解决创建项目中的一些复杂的工作。
* 基本作用：创建项目基础结构，提供项目规范和约定。其中包括：相同的组织结构、开发范式、模块依赖、工具配置、基础代码。

## 编程题

##### 1、概述脚手架实现的过程，并使用 NodeJS 完成一个自定义的小型脚手架工具

脚手架的实现, 通过package的bin字段指定执行一段代码, 然后在这段代码中:
+ 通过交互命令行询问用户问题, 接收用户输入
+ 根据配置遍历文件/模板, 并将需要的数据写入其中
+ 将渲染结果写入目标路径中

[代码][1]
[文档][2]

##### 2、尝试使用 Gulp 完成项目的自动化构建

[代码][3]
[文档][4]

##### 3、使用 Grunt 完成项目的自动化构建

[代码][5]
[文档][6]

[1]:https://github.com/LeonYoYo/Advanced/tree/master/fed-e-task-02-01/code/generator-practice-proj 
[2]:https://github.com/LeonYoYo/Advanced/blob/master/fed-e-task-02-01/notes/generator-practice-proj.md
[3]:https://github.com/LeonYoYo/Advanced/blob/master/fed-e-task-02-01/code/gulp/gulpfile.js
[4]:https://github.com/LeonYoYo/Advanced/blob/master/fed-e-task-02-01/notes/gulp.md
[5]:https://github.com/LeonYoYo/Advanced/blob/master/fed-e-task-02-01/code/grunt/gruntfile.js
[6]:https://github.com/LeonYoYo/Advanced/blob/master/fed-e-task-02-01/notes/grunt.md
