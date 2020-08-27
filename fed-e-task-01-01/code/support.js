class Container {
    static of (value) {
        return new Container(value);
    }
    constructor(value) {
        this._value = value;
    }
    map(fn) {
        return Container.of(fn(this._value));
    }
}
class Maybe {
    static of (x) {
        return new Maybe(x);
    }
    isNothing() {
        return this._value === null || this._value === undefined;
    }
    constructor(x) {
        this._value = x;
    }
    map(fn) {
        return this.isNothing() ? this : Maybe.of(fn(this._value));
    }
}

// 重点知识点：
// fp-数据之后，函数优先
// fp.map 只接受一个参数---函数

const fp = require('lodash/fp')

// 练习1
// 使用 fp.add(x, y) 和 fp.map(f, x) 创建一个能让 functor 里的值增加的函数 ex1
// let maybe = Maybe.of([5, 6, 1]);
// let ex1 = fp.map(v => fp.add(v, 1));
// console.log(maybe.map(ex1)._value); // 获得[ 6, 7, 2 ]
// maybe是一个函子，要调用他的方法就要使用他的map方法，所以第一步应该是maybe.map(处理函数)
// 处理函数的目的是遍数组，给每个值加一，使用fp.add，第一个参数是每个值，第二个参数是加数

// 练习2
// 实现一个函数 ex2，能够使用 fp.first 获取列表的第一个元素
// let xs = Container.of(['do', 'ray', 'me', 'fa', 'so', 'la', 'ti', 'do']);
// let ex2 = fn => xs.map(fn);
// console.log(ex2);
// let ex2 = fn => xs.map(fn)._value;
// console.log(ex2(fp.first)); // 获得"do"
// 调用函子的map方法给它传入要处理值的函数，所以先定义ex2，给ex2传递要获取第一个元素的方法fp.first，可以获得Container { _value: 'do' }，所以最终的结果
// 应该是ex2(fp.first)._value，为了方便，我处理了ex2，以便与调用ex2(fp.first)可以直接获得value


// 练习3
// 实现一个函数 ex3 ，使用 safeProp 和 fp.first 找到 user 的名字的首字母
// let safeProp = fp.curry(function (x, o) {
//     // console.log(x,o);
//     return Maybe.of(o[x]);
// });
// let user = {
//     id: 2,
//     name: 'Albert'
// };

// let ex3 = () => safeProp('name', user); // 获得{ _value: 'Albert' }
// let ex3 = () => safeProp('name', user).map(fp.first)._value;
// let result = ex3();
// console.log(result); // A
// 下手之前的思路就是肯定最后要有._value才能获得结果，然后处理获取首字母使用fp.first，要获取首字母，就需要处理方法获取到user对象的name属性

// 练习4
// 使用 Maybe 重写 ex4 ，不要有 if 语句

// let ex4 = function (n) {
//     if (n) {
//         return parseInt(n)
//     }
// }
// console.log(ex4('10'));

// let ex4 = n => Maybe.of(n).map(parseInt)._value;
// console.log(ex4('10')); // 10
