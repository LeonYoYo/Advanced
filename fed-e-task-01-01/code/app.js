//1.谈谈你是如何理解JS异步编程的，Eventloop、消息队列都是做什么的，什么是宏任务，什么是微任务？

// js是单线程的，两段js代码是不能同时执行的，但我们在实际的开发中会碰到很多需要在某一段代码执行完，
// 再去执行另一端代码，此时就需要异步

// Eventloop指的是事件循环，是js实现异步的具体解决方案。
// js 在运行时会将变量存放在堆（heap）和栈（stack）中，堆中通常存放着一些对象，而变量及对象的指针则存放在栈中。
// js 在执行时，同步任务会排好队，在主线程上按照顺序执行，前面的执行完了再执行后面的，排队的地方叫执行栈。
// js 对异步任务不会停下来等待，会依次放入消息队列中。
// 当执行栈的同步任务已经执行完成，此时主线程闲下来，它便会去查看消息队列是否有任务，如果有，主线程会将最先进入消息队列的加入到执行栈中执行，
// 执行栈中的任务执行完了之后，主线程便又去消息队列中查看是否有任务可执行。主线程去消息队列读取任务到执行栈中去执行，
// 这个过程是循环往复的，这便是 Event Loop

// 异步任务分为宏任务和微任务。微任务比宏任务先执行。
// 大部分的异步调用都是宏任务，例如包括整体代码script，setTimeout，setInterval
// 微任务：Promise，process.nextTick

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// 一.将下面异步代码使用Promise的方式改进
setTimeout(function () {
    var a = 'hello'
    setTimeout(function () {
        var b = 'lagou'
        setTimeout(function () {
            var c = 'i love u'
            console.log(a+b+c);
        }, 10);
    }, 10);
}, 10);

///////////////////////////////////////////

function setTime(str) {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            resolve(str)
        }, 10)
    })
}

setTime('hello')
    .then(value => {
        return setTime(value + 'lagou');
    }).then(value => {
        // console.log(value + 'i love u');
        return setTime(value + 'i love u');
    }).then(value => {
        console.log(value);
    })

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

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

let isLastInStock = function (cars){
    // 获取最后一条数据
    let last_car = fp.last(cars)
    // 获取最后一条数据的in_stock属性值
    return fp.prop('in_stock', last_car);
}
console.log(isLastInStock(cars));


let isLastInStock = fp.flowRight(fp.prop('in_stock'), fp.last)
console.log(isLastInStock(cars));

// 联系2: 使用fp.flowRight()、fp.prop()和fp.first()获取第一个car的name
let isFirstInStock = fp.flowRight(fp.prop('name'), fp.first)
console.log(isFirstInStock(cars));

// 联系3: 使用帮助函数_average重构averageDollarValue,使用函数组合的方式实现

let _average = function(xs){
    return fp.reduce(fp.add, 0, xs) / xs.length
} // <- 无须改动

let averageDollarValue= function(cars){
    let dollar_value = fp.map(function(car){
        return car.dollar_value
    }, cars)
    return _average(dollar_value)
}
console.log(averageDollarValue(cars));

let averageDollarValue = fp.flowRight(_average, fp.map(car => car.dollar_value))
console.log(averageDollarValue(cars));
// 首先写上fp.flowRight，然后按照从右到左，将原本的方法中的函数代入到fp.flowRight的写法中

// 练习4: 使用flowRight写一个sanitizeNames()函数，返回一个下划线链接的小写字符串，把数组中的name转换为这种形式： 例如：sanitizeNames(["Hello World"]) => ["hello_world"]

let _underscore = fp.replace(/\W+/g,'_') // <-- 无须改动，并在sanitizeNames中使用它

// 遍历数组的每一个对象，首先转换成大写，然后空格替换成下划线得到hello_world
let sanitizeNames = fp.flowRight(_underscore, fp.toLower);
console.log(fp.map(sanitizeNames(["Hello World"])))
let sanitizeNames = fp.map(fp.flowRight(_underscore, fp.toLower));
console.log(sanitizeNames(["Hello World"]))  // [ 'hello_world' ]

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

let maybe = Maybe.of([5, 6, 1]);
// console.log(maybe);
// let ex1 = () => {
//     // ... 你需要实现的
// }

let ex1 = fp.flowRight(fp.map(v => fp.add(v, 1)));
console.log(maybe.map(ex1));
// Maybe { _value: [ 6, 7, 2 ] }
let ex1 = n => maybe.map(arr => fp.map(v => fp.add(v, n), arr));
// console.log(ex1(1)); // 数组每一项加1
// Maybe { _value: [ 6, 7, 2 ] }


// 练习2
// 实现一个函数 ex2，能够使用 fp.first 获取列表的第一个元素

let xs = Container.of(['do', 'ray', 'me', 'fa', 'so', 'la', 'ti', 'do']);
// let ex2 = () => {
//     // ... 你需要实现的
// }

let ex2 = fn => xs.map(fn)._value;
console.log(ex2(fp.first)); // "do"


// 练习3
// 实现一个函数 ex3 ，使用 safeProp 和 fp.first 找到 user 的名字的首字母

let safeProp = fp.curry(function (x, o) {
    return Maybe.of(o[x]);
});
let user = {
    id: 2,
    name: 'Albert'
};

// let ex3 = () => {
//     // ... 你需要实现的
// }

let ex3 = () => safeProp('name', user).map(fp.first)._value;
console.log(ex3()); // A


// 练习4
// 使用 Maybe 重写 ex4 ，不要有 if 语句

let ex4 = function (n) {
    if (n) {
        return parseInt(n)
    }
}

let ex4 = n => Maybe.of(n).map(parseInt)._value;
console.log(ex4('100')); // 100

// 四、手写实现mypromise源码

const PENDING = 'pending'; // 等待
const FULFILLED = 'fulfilled'; // 成功
const REJECTED = 'rejected'; // 失败

class MyPromise {
  constructor (executor) {
    try {
      executor(this.resolve, this.reject)
    } catch (e) {
      this.reject(e);
    }
  }
  // promsie 状态 
  status = PENDING;
  // 成功之后的值
  value = undefined;
  // 失败后的原因
  reason = undefined;
  // 成功回调
  successCallback = [];
  // 失败回调
  failCallback = [];

  resolve = value => {
    // 如果状态不是等待 阻止程序向下执行
    if (this.status !== PENDING) return;
    // 将状态更改为成功
    this.status = FULFILLED;
    // 保存成功之后的值
    this.value = value;
    // 判断成功回调是否存在 如果存在 调用
    // this.successCallback && this.successCallback(this.value);
    while(this.successCallback.length) this.successCallback.shift()()
  }
  reject = reason => {
    // 如果状态不是等待 阻止程序向下执行
    if (this.status !== PENDING) return;
    // 将状态更改为失败
    this.status = REJECTED;
    // 保存失败后的原因
    this.reason = reason;
    // 判断失败回调是否存在 如果存在 调用
    // this.failCallback && this.failCallback(this.reason);
    while(this.failCallback.length) this.failCallback.shift()()
  }
  then (successCallback, failCallback) {
    // 参数可选
    successCallback = successCallback ? successCallback : value => value;
    // 参数可选
    failCallback = failCallback ? failCallback: reason => { throw reason };
    let promsie2 = new MyPromise((resolve, reject) => {
      // 判断状态
      if (this.status === FULFILLED) {
        setTimeout(() => {
          try {
            let x = successCallback(this.value);
            // 判断 x 的值是普通值还是promise对象
            // 如果是普通值 直接调用resolve 
            // 如果是promise对象 查看promsie对象返回的结果 
            // 再根据promise对象返回的结果 决定调用resolve 还是调用reject
            resolvePromise(promsie2, x, resolve, reject)
          }catch (e) {
            reject(e);
          }
        }, 0)
      }else if (this.status === REJECTED) {
        setTimeout(() => {
          try {
            let x = failCallback(this.reason);
            // 判断 x 的值是普通值还是promise对象
            // 如果是普通值 直接调用resolve 
            // 如果是promise对象 查看promsie对象返回的结果 
            // 再根据promise对象返回的结果 决定调用resolve 还是调用reject
            resolvePromise(promsie2, x, resolve, reject)
          }catch (e) {
            reject(e);
          }
        }, 0)
      } else {
        // 等待
        // 将成功回调和失败回调存储起来
        this.successCallback.push(() => {
          setTimeout(() => {
            try {
              let x = successCallback(this.value);
              // 判断 x 的值是普通值还是promise对象
              // 如果是普通值 直接调用resolve 
              // 如果是promise对象 查看promsie对象返回的结果 
              // 再根据promise对象返回的结果 决定调用resolve 还是调用reject
              resolvePromise(promsie2, x, resolve, reject)
            }catch (e) {
              reject(e);
            }
          }, 0)
        });
        this.failCallback.push(() => {
          setTimeout(() => {
            try {
              let x = failCallback(this.reason);
              // 判断 x 的值是普通值还是promise对象
              // 如果是普通值 直接调用resolve 
              // 如果是promise对象 查看promsie对象返回的结果 
              // 再根据promise对象返回的结果 决定调用resolve 还是调用reject
              resolvePromise(promsie2, x, resolve, reject)
            }catch (e) {
              reject(e);
            }
          }, 0)
        });
      }
    });
    return promsie2;
  }
  finally (callback) {
    return this.then(value => {
      return MyPromise.resolve(callback()).then(() => value);
    }, reason => {
      return MyPromise.resolve(callback()).then(() => { throw reason })
    })
  }
  catch (failCallback) {
    return this.then(undefined, failCallback)
  }
  static all (array) {
    let result = [];
    let index = 0;
    return new MyPromise((resolve, reject) => {
      function addData (key, value) {
        result[key] = value;
        index++;
        if (index === array.length) {
          resolve(result);
        }
      }
      for (let i = 0; i < array.length; i++) {
        let current = array[i];
        if (current instanceof MyPromise) {
          // promise 对象
          current.then(value => addData(i, value), reason => reject(reason))
        }else {
          // 普通值
          addData(i, array[i]);
        }
      }
    })
  }
  static resolve (value) {
    if (value instanceof MyPromise) return value;
    return new MyPromise(resolve => resolve(value));
  }
}

function resolvePromise (promsie2, x, resolve, reject) {
  if (promsie2 === x) {
    return reject(new TypeError('Chaining cycle detected for promise #<Promise>'))
  }
  if (x instanceof MyPromise) {
    // promise 对象
    // x.then(value => resolve(value), reason => reject(reason));
    x.then(resolve, reject);
  } else {
    // 普通值
    resolve(x);
  }
}

