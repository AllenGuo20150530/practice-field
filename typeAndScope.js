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
// 注意，Null值会是object
// 函数会是function
// 数组会是object
log(typeof 10)                      // number
log(typeof 'string')                // string
log(typeof true)                    // boolean
log(typeof null)                    // object
log(typeof undefined)               // undefined
log(typeof {a: 10})                 // object
log(typeof log)                     // function
log(typeof [1, 2])                  // object

// 原型prototype, 浏览器中为了显示，一般会用__proto__来显示出一个对象的prototype属性
// 子会继承父的prototype

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
obj_b = {v: 'str'}      // 将obj_b指向新的堆内存中的值{v: 'str'}
log(obj_a, obj_b)
