## 一.将下面异步代码使用Promise的方式改进

> 看着课程视频边看边做的，根据ajax的案例，首先知道这种嵌套的最后的使用应该是.then().then()这样的，然后我需要创建一个Promise，并且需要它返回一个Promise，我创建了setTime，将处理函数放入setTime，然后then调用，一步步获得字符串往后传递，然后拼接，我只能想到拼接起来，不是很确定这样的写法是不是正确。

## 二.基于以下代码完成下面的四个联系 
> horsepower 马力， dollar_value 价格， in_stock 库存

> 主要思路就是使用fp.flowRight，按照从右到左依次实现

### 联系1: 使用函数组合fp.flowRight()重新实现下面这个函数

```javascript
let isLastInStock = function (cars){
    // 获取最后一条数据
    let last_car = fp.last(cars)
    // 获取最后一条数据的in_stock属性值
    return fp.prop('in_stock', last_car);
}
console.log(isLastInStock(cars));

let isLastInStock = fp.flowRight(fp.prop('in_stock'), fp.last)
console.log(isLastInStock(cars));
```

### 联系2: 使用fp.flowRight()、fp.prop()和fp.first()获取第一个car的name

```javascript
let isFirstInStock = fp.flowRight(fp.prop('name'), fp.first)
console.log(isFirstInStock(cars));
```

### 联系3: 使用帮助函数_average重构averageDollarValue,使用函数组合的方式实现

```javascript
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
```

### 练习4: 使用flowRight写一个sanitizeNames()函数，返回一个下划线链接的小写字符串，把数组中的name转换为这种形式： 例如：sanitizeNames(["Hello World"]) => ["hello_world"]

```javascript
let _underscore = fp.replace(/\W+/g,'_') // <-- 无须改动，并在sanitizeNames中使用它
// 遍历数组的每一个对象，首先转换成大写，然后空格替换成下划线得到hello_world
let sanitizeNames = fp.flowRight(_underscore, fp.toLower);
console.log(fp.map(sanitizeNames(["Hello World"])))

let sanitizeNames = fp.map(fp.flowRight(_underscore, fp.toLower));
console.log(sanitizeNames(["Hello World"]))  // [ 'hello_world' ]
```

## 三、基于下面提供的代码，完成后续的四个联系 可见support.js

> 重点知识点：
  fp-数据之后，函数优先
  fp.map 只接受一个参数---函数

### 练习1 使用 fp.add(x, y) 和 fp.map(f, x) 创建一个能让 functor 里的值增加的函数 ex1

```javascript
let maybe = Maybe.of([5, 6, 1]);
let ex1 = fp.map(v => fp.add(v, 1));
console.log(maybe.map(ex1)._value); // 获得[ 6, 7, 2 ]
// maybe是一个函子，要调用他的方法就要使用他的map方法，所以第一步应该是maybe.map(处理函数)
// 处理函数的目的是遍数组，给每个值加一，使用fp.add，第一个参数是每个值，第二个参数是加数
```

### 练习2 实现一个函数 ex2，能够使用 fp.first 获取列表的第一个元素

```javascript
let xs = Container.of(['do', 'ray', 'me', 'fa', 'so', 'la', 'ti', 'do']);
let ex2 = fn => xs.map(fn);
console.log(ex2);
let ex2 = fn => xs.map(fn)._value;
console.log(ex2(fp.first)); // 获得"do"
// 调用函子的map方法给它传入要处理值的函数，所以先定义ex2，给ex2传递要获取第一个元素的方法fp.first，可以获得Container { _value: 'do' }，所以最终的结果
// 应该是ex2(fp.first)._value，为了方便，我处理了ex2，以便与调用ex2(fp.first)可以直接获得value
```

### 练习3  实现一个函数 ex3 ，使用 safeProp 和 fp.first 找到 user 的名字的首字母

```javascript
let safeProp = fp.curry(function (x, o) {
    // console.log(x,o);
    return Maybe.of(o[x]);
});
let user = {
    id: 2,
    name: 'Albert'
};

let ex3 = () => safeProp('name', user); // 获得{ _value: 'Albert' }
let ex3 = () => safeProp('name', user).map(fp.first)._value;
let result = ex3();
console.log(result); // A
// 下手之前的思路就是肯定最后要有._value才能获得结果，然后处理获取首字母使用fp.first，要获取首字母，就需要处理方法获取到user对象的name属性
```

### 练习4 使用 Maybe 重写 ex4 ，不要有 if 语句

```javascript
let ex4 = function (n) {
    if (n) {
        return parseInt(n)
    }
}
console.log(ex4('10'));

let ex4 = n => Maybe.of(n).map(parseInt)._value;
console.log(ex4('10')); // 10
```
## 四、手写实现mypromise源码

> 自己尝试写了几次 都会卡壳，作业的结果是边看视频边照着写的，过程中去梳理理解
