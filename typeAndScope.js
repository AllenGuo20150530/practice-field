// 定义自己的log函数
const log = function() {
    console.log.apply(console, arguments)
}
// js五种基本类型：Number, String, Boolean, Null, Undefined
// js一种引用类型：Object
// 一定要牢记 基本类型 和 引用类型 的区别：
// 基本类型的变量，就是一个值；而引用类型的变量，是一个指针（引用），指向它的值
// 这也就导致基本类型在复制时，会出现一样的副本，修改副本的值不影响原先变量的值
var a = 10
var b = a
log('a:', a)
log('b:', b)
// 而对于引用类型变量的复制，实际仅仅复制了一个指向那个值的指针，也就是两个变量指向同一个值
// 修改任何一个，另一个都会改变
var obj1 = new Object()
var obj2 = obj1
obj1.name = 'Allen'
obj2.age = 18
log('obj1: ', obj1.name, obj1.age)  // obj1:  Allen 18
log('obj2: ', obj2.name, obj2.age)  // obj2:  Allen 18

// 使用typeof 来判定一个变量是什么类型
log(typeof 10)                      // number
log(typeof 'string')                // string
log(typeof true)                    // boolean
log(typeof null)                    // object
log(typeof undefined)               // undefined
log(typeof {a: 10})                 // object
log(typeof log)                     // function
log(typeof [1, 2])                  // object

// 使用instanceof来检测引用类型
log([1, 2] instanceof Array)        // true
log('string' instanceof Object)     // false
log({a: 10} instanceof Object)      // true
// 注意，Null值会是object
// 函数会是function
// 数组会是object

// JS中的堆和栈
/*
    JS内存分为栈内存和堆内存
    栈内存读取速度快，但空间小
    堆内存空间大，但读取速度慢
    基本类型的变量值保存在栈内存中
    引用类型，栈内存中存放引用类型的地址（指针），堆内存中存放引用类型的值
*/
var a = 10          // 为变量a分配栈内存 a: 10
log(a)
var b = a           // 原始类型直接访问值，所以为变量b分配新的栈内存 b: 10
log(b)
b = 20              // 直接修改栈内存中b的值，而对a没有影响
log(b)

var obj_a = {v: 'str'}  // 栈内存中存放访问地址（指针）obj_a; 堆内存中存放值{v: 'str'}
var obj_b = obj_a       // 将栈内存中的访问地址赋值给obj_b并保存，其指向obj_a堆内存中的{v: 'str'}
log(obj_a, obj_b)
obj_b.v = 'str2'        // 会修改堆内存中的值为{v: 'str2'}, 由于obj_a也指向这个值，因此变量obj_a也会改变
log(obj_a, obj_b)
obj_b = {v: 'str'}      // 将obj_b指向新的堆内存中的值{v: 'str'}, 不再指向原先的{v: 'str2'}
log(obj_a, obj_b)

// 原型prototype, 浏览器中为了显示，一般会用__proto__来显示出一个对象的prototype属性
// 子对象会继承父对象的prototype
// 基本类型没有prototyple属性，引用类型object，array，function等才有

// 用new构造一个新对象obj，obj就会继承Object的全部属性
// var obj = new Object()
// 会显示出继承的全部prototype属性
// log(obj.__proto__)
// obj.name = 'Allen'
// obj.age = 18
// obj.getName = function() {
//     log(this.name)
// }
//
//
// var People = function(name, age) {
//     this.name = name
//     this.age = age
// }
// People.prototype.getName = function () {
//     return this.name
// }
// var foo1 = new People('Allen', 18)
// log()
// var proto = allen.getPrototypeOf
// log(proto)

// 作用域链
// color为全局变量，在函数内部也可以访问
var color = 'blue'
var changeColor = function() {
    // anothorColor为changeColor函数内部变量，不能被外部所访问
    var anothorColor = 'red'
    var swapColor = function() {
        // tempColor与anothorColor类似，是swapColor函数内部变量，不能被外层访问到
        var tempColor = anothorColor
        // 当访问anothorColor时，会先从本函数内部寻找，找不到，会到上层changeColor()寻找
        anothorColor = color
        // 当访问color时，在本层寻找不到，会逐级向上直到全局作用域
        color = tempColor
    }
    return swapColor
}
// 由于anothorColor tempColor属于局部作用域中的局部变量，在全局环境中无法访问
log(anothorColor)           // Uncaught ReferenceError: anothorColor is not defined
log(tempColor)              // Uncaught ReferenceError: tempColor is not defined
var swapColor = changeColor()
swapColor()
// changeColor()()
// 一个简单的例子解释作用域内变量的查询
var color = 'blue'
var showColor = function() {
    log(color)
}
showColor()                 // blue

// 延长作用域链
// try-catch语句的catch块
// with语句
var buildUrl = function() {
    var qs = "?debug=true"
    with(location) {
        // 用with语句将location对象引入作用域之后（添加在作用域链前端），可以访问其href属性
        // href === location.href
        var url = href + qs
    }
    return url
}
log(buildUrl())
// ES6新增块级作用域，使用let声明变量
// 以前
if(2 == '2') {
    var i = 10
}
log(i)                  //10
// ES6
if(2 == '2') {
    let j = 10
}
log(j)                  // Uncaught ReferenceError: j is not defined
// 尤其for循环
for(var j = 0; j < 2; j++) {
    log(j)              // 0 1
}
log(j)                  // 2
for (let k = 0; k < 2; k++) {
    log(k)              // 0 1
}
log(k)                  // VM473:4 Uncaught ReferenceError: k is not defined



var i = 0
// 在 局部作用域 中访问全局变量
const showme = function() {
    log(i)
}
showme()                // 0

// 在 块级作用域 中访问全局变量
for(; i < 2; i++) {
    log(i)              // 0 1
}
