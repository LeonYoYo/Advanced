
// 一.将下面异步代码使用Promise的方式改进

// 二.基于以下代码完成下面的四个联系
const fp = require('lodash/fp')
// 数据
// horsepower 马力， dollar_value 价格， in_stock 库存
const cars = [{
        name: 'Ferrari FF',
        horsepower: 660,
        dollar_value: 700000,
        in_stock: true
    },
    {
        name: 'Spyker C12 Zagato',
        horsepower: 650,
        dollar_value: 648000,
        in_stock: false
    },
    {
        name: 'Jaguar XKR-S',
        horsepower: 550,
        dollar_value: 132000,
        in_stock: false
    },
    {
        name: 'Audi R8',
        horsepower: 525,
        dollar_value: 114200,
        in_stock: false
    },
    {
        name: 'Aston Martin One-77',
        horsepower: 750,
        dollar_value: 1850000,
        in_stock: true
    },
    {
        name: 'Pagani Huayra ',
        horsepower: 700,
        dollar_value: 1300000,
        in_stock: false
    },
]

// 联系1: 使用函数组合fp.flowRight()重新实现下面这个函数

// let isLastInStock = function (cars){
//     // 获取最后一条数据
//     let last_car = fp.last(cars)
//     // 获取最后一条数据的in_stock属性值
//     return fp.prop('in_stock', last_car);
// }
// console.log(isLastInStock(cars));

// 
// let isLastInStock = fp.flowRight(fp.prop('in_stock'), fp.last)
// console.log(isLastInStock(cars));

// 联系2: 使用fp.flowRight()、fp.prop()和fp.first()获取第一个car的name
// let isFirstInStock = fp.flowRight(fp.prop('name'), fp.first)
// console.log(isFirstInStock(cars));

// 联系3: 使用帮助函数_average重构averageDollarValue,使用函数组合的方式实现

// let _average = function(xs){
//     return fp.reduce(fp.add, 0, xs) / xs.length
// } // <- 无须改动

// let averageDollarValue= function(cars){
//     let dollar_value = fp.map(function(car){
//         return car.dollar_value
//     }, cars)
//     return _average(dollar_value)
// }
// console.log(averageDollarValue(cars));

// let averageDollarValue = fp.flowRight(_average, fp.map(car => car.dollar_value))
// console.log(averageDollarValue(cars));

// 练习4: 使用flowRight写一个sanitizeNames()函数，返回一个下划线链接的小写字符串，把数组中的name转换为这种形式： 例如：sanitizeNames(["Hello World"]) => ["hello_world"]

// let _underscore = fp.replay(/\W+/g,'_') // <-- 无须改动，并在sanitizeNames中使用它

// let sanitizeNames = fp.flowRight(fp.map(fp.flowRight(_underscore, fp.toLower)));


// 首先转换成大写，然后空格替换成下划线
let sanitizeNames = fp.flowRight(_underscore, fp.toLower);

console.log(sanitizeNames(["Hello World"])); // [ 'hello_world' ]



////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// 三、基于下面提供的代码，完成后续的四个联系
// support.js
// class Container {
//     static of (value) {
//         return new Container(value);
//     }
//     constructor(value) {
//         this._value = value;
//     }
//     map(fn) {
//         return Container.of(fn(this._value));
//     }
// }
// class Maybe {
//     static of (x) {
//         return new Maybe(x);
//     }
//     isNothing() {
//         return this._value === null || this._value === undefined;
//     }
//     constructor(x) {
//         this._value = x;
//     }
//     map(fn) {
//         return this.isNothing() ? this : Maybe.of(fn(this._value));
//     }
// }
// module.exports = {
//     Maybe,
//     Container
// }

// 练习1
// 使用 fp.add(x, y) 和 fp.map(f, x) 创建一个能让 functor 里的值增加的函数 ex1
// app.js
// const fp = require('lodash/fp')
// const {
//     Maybe,
//     Container
// } = require('./support.js');
// let maybe = Maybe.of([5, 6, 1]);
// console.log(maybe);
// let ex1 = () => {
//     // ... 你需要实现的
// }

// 答：
// let ex1 = fp.flowRight(fp.map(v => fp.add(v, 1)));
// console.log(maybe.map(ex1));
// Maybe { _value: [ 6, 7, 2 ] }
// let ex1 = n => maybe.map(arr => fp.map(v => fp.add(v, n), arr));
// console.log(ex1(1)); // 数组每一项加1
// Maybe { _value: [ 6, 7, 2 ] }


// 练习2
// 实现一个函数 ex2，能够使用 fp.first 获取列表的第一个元素
// app.js
// const fp = require('lodash/fp');
// const {
//     Maybe,
//     Container
// } = require('./support.js');
// let xs = Container.of(['do', 'ray', 'me', 'fa', 'so', 'la', 'ti', 'do']);
// let ex2 = () => {
//     // ... 你需要实现的
// }
// 答：

// let ex2 = fn => xs.map(fn)._value;
// console.log(ex2(fp.first)); // "do"



// 练习3
// 实现一个函数 ex3 ，使用 safeProp 和 fp.first 找到 user 的名字的首字母
// app.js
// const fp = require('lodash/fp');
// const {
//     Maybe,
//     Container
// } = require('./support.js');
// let safeProp = fp.curry(function (x, o) {
//     return Maybe.of(o[x]);
// });
// let user = {
//     id: 2,
//     name: 'Albert'
// };

// let ex3 = () => {
//     // ... 你需要实现的
// }

// 答：
// let ex3 = () => safeProp('name', user).map(fp.first)._value;
// console.log(ex3()); // A



// 练习4
// 使用 Maybe 重写 ex4 ，不要有 if 语句
// const fp = require('lodash/fp');
// const {
//     Maybe,
//     Container
// } = require('./support.js');
// let ex4 = function (n) {
//     if (n) {
//         return parseInt(n)
//     }
// }

// 答
// let ex4 = n => Maybe.of(n).map(parseInt)._value;
// console.log(ex4('100')); // 100