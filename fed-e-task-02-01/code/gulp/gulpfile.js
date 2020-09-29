// 实现这个项目的构建任务

const { src, dest, parallel, series, watch } = require('gulp') // series 依次执行 例如部署，编译 parallel 并行执行 例如js,css
const del = require('del');
const browser = require('browser-sync'); // 不是gulp插件
const loadPlugins = require('gulp-load-plugins');

const plugins = loadPlugins(); // 用plugins替代所有要引入的插件
const bs = browser.create() //创建开发服务器
// 样式编译
const style = () => {
    return src('src/assets/styles/*.scss', {
        base: 'src' //转换的基准路径，保留src后面的路径到dist
    })
    .pipe(plugins.sass({
        outputStyle: 'expanded' // 转换后大括号另起一行完全展开
    }))
    .pipe(dest('temp'))
    .pipe(bs.reload({ stream: true}))
}
// 脚本编译
const script = () => {
    return src('src/assets/scripts/*.js', {
        base: 'src',
    })
    .pipe(plugins.babel({ // babel本身不做es6转换
        presets: ['@babel/preset-env'] // 最新ECMAScirpt转换
    }))
    .pipe(dest('temp'))
    .pipe(bs.reload({ stream: true}))
}

const data = {
    menus: [
      {
        name: 'Home',
        icon: 'aperture',
        link: 'index.html'
      },
      {
        name: 'Features',
        link: 'features.html'
      },
      {
        name: 'About',
        link: 'about.html'
      },
      {
        name: 'Contact',
        link: '#',
        children: [
          {
            name: 'Twitter',
            link: 'https://twitter.com/w_zce'
          },
          {
            name: 'About',
            link: 'https://weibo.com/zceme'
          },
          {
            name: 'divider'
          },
          {
            name: 'About',
            link: 'https://github.com/zce'
          }
        ]
      }
    ],
    pkg: require('./package.json'),
    date: new Date()
  }
// html模板编译
const page = () => {
    return src('src/*.html',{
        base: 'src'
    })
    .pipe(plugins.swig({data})) // 注意传参
    .pipe(dest('temp'))
    .pipe(bs.reload({ stream: true}))
}
// 图片压缩处理
const image = () => {
    return src('src/assets/images/**', { base: 'src'})
    .pipe(plugins.imagemin())
    .pipe(dest('dist'))
}
// 字体文件
const font = () => {
    return src('src/assets/fonts/**', { base: 'src'})
    .pipe(plugins.imagemin())
    .pipe(dest('dist'))
}
// 拷贝public下的文件夹
const extra = () => {
    return src('public/**',{ base: 'public'})
    .pipe(dest('dist'))
}

// 删除文件夹
const clean = () => {
    return del(['dist', 'temp']) // del 方法接收一个路径数组
}

const serve = () => {
  // 监听src中的scss,js,html文件的变化，重新打包
   watch('src/assets/styles/*.scss',style)
   watch('src/assets/scripts/*.js',script)
   watch('src/*.html',page)
   watch([
    'src/assets/styles/*.scss',
    'src/assets/scripts/*.js',
    'src/*.html'
   ], bs.reload) // 重新打包完毕后，刷新页面
    bs.init({
        notify: false, //关闭页面提示
        port: 3001, //启动端口
        // open: false, //默认关闭自动打开浏览器 
        // files: 'dist/**', //启动监听的文件通配符
        server: {
            baseDir: ['temp', 'src', 'public'], //优先级低于routes
            routes: {
                '/node_modules': 'node_modules', //web运行时的文件的路径映射
            }
        }
    })
}
const compile = parallel(style, script, page);


const develop = series(compile, serve) // 先编译，在启动web

const useref = () => { 
  //html中将第三方的包打包进vendor.js
  return src('temp/*.html',{ base: 'temp' })
    .pipe(plugins.useref({ searchPath: ['temp','.']})) // 搜索路径从dist到gulpfile的当前目录
    .pipe(plugins.if(/\.js$/, plugins.uglify())) //压缩vendor.js
    .pipe(plugins.if(/\.css$/, plugins.cleanCss())) //压缩vendor.css
    .pipe(plugins.if(/\.html$/, plugins.htmlmin({ 
      collapseWhitespace: true,
      minifyCSS: true,
      minifyJS: true
  }))) //压缩html
    .pipe(dest('dist')) //避免文件冲突，处理以后放入新的文件夹
}
// 先删除dist文件夹再打包,image, font在此时打包
const build = series(clean, parallel(series(compile,useref), image, font, extra));
module.exports =  {
    clean,
    compile,
    build,
    develop,
    useref
}
