
/* 面向对象编程
    ES6中已添加类的概念，
    但还是沿用对象

    每个对象都是基于一个引用类型创建的
    这个引用类型可以是原生类型，也可以自定义类型
 */

// 定义自己的log函数，两种方式皆可
// 用apply方法
var log = function() {
    console.log.apply(console, arguments)
}
// 使用bind方法
var log = console.log.bind()
/* 6.1 理解对象 */

// 自定义对象方法1： 使用Object实例，添加属性和方法
var person = new Object()
person.name = 'Allen'
person.age = 18
person.job = 'Engineer'
person.sayName = function() {
    log(this.name)
}
// 定义对象方法2： 对象字面量
var person = {
    name: 'Allen',
    age: 18,
    job: 'Engineer',
    sayName: function() {
        log(this.name)
    }
}

/* 6.1.1 属性类型 */
/*
    内部才使用的特性（attribute），描述了属性（property）的特征。
    数据属性：
        [[Configurable]]:
            表示能否通过delete删除属性从而重新定义属性
            能否修改属性的特性
            或者能否把属性修改为访问器属性
            默认值 true
        [[Enumerable]]:
            表示能否通过for-in循环返回属性
            默认值 true
        [[Writable]]:
            表示能否修改属性的值
            默认值 true
        [[Value]]:
            包含这个属性的值。
            读取时，和写入时，都在这个位置
            默认值 undefined

    要修过属性默认的特性，必须通过Object.defineProperty(obj, attr, descriptor)方法
        obj: 属性所在的对象名
        attr: 属性名
        descriptor: 必须是configurable, enumerable, writable, value四者之一
*/

var person = {
    name: 'Allen',
    age: 18
}
Object.defineProperty(person, 'name', {
    // 将[[Writable]]特性修改为false
    writable: false,
    value: 'Allen'
})
log(person.name)                        // 'Allen'
person.name = 'Fuck'                    // 在非严格模式下，操作被忽略；严格模式下，会报错
log(person.name)                        // 'Allen'

Object.defineProperty(person, 'age', {
    // 将[[Configurable]]属性设置为false，同时修改age的值
    configurable: false,
    value: 20
})
log(person.name, person.age)            // Allen 20
delete person.name                      // name属性被删除
delete person.age                       // age属性不能被delete掉
log(person.name, person.age)            // undefined 20

/*
    要注意的是，configurable属性一旦修改为不可配置，则不能再修改为可配置。
    在调用Object.defineProperty()方法修改除writable之外的特性，都会报错--《JS高程》
    实际试验，也会报错
*/
// 报错
Object.defineProperty(person, 'age', {
    // 将[[Configurable]]属性设置为false，同时修改age的值
    configurable: true,
    value: 20
})
// 报错
Object.defineProperty(person, 'age', {
    writable: true
})

/*
    访问器属性：被包含数据值，一对儿getter setter函数。访问器属性4个特性：
        [[Configurable]]:
            表示能否通过delete删除属性从而重新定义属性
            能否修改属性的特性
            或者能否把属性修改为访问器属性
            默认值 true
        [[Enumerable]]:
            表示能否通过for-in循环返回属性
            默认值 true
        [[Get]]:
            在读取属性时调用的函数
            默认值 undefined
        [[Set]]:
            在写入属性时调用的函数
            默认值 undefined
*/
// 访问器属性，同样需要Object.defineProperty()方法定义
var book = {
    _year : 2004,
    edition: 1
}
Object.defineProperty(book, 'year', {
    get: function() {
        return this._year
    },
    set: function(newValue) {
        if(newValue > 2004) {
            this._year = newValue
            this.edition += newValue - 2004
        }
    }
})
log(book.year, book.edition)            // 2004 1
book.year = 2006
log(book.year, book.edition)            // 2006 3

// 兼容性考虑：objName.__defineGetter__() 和 objName.__defineSetter__()

/* 6.1.2 定义多个属性 */
// 使用Object.defineProperties()定义多个属性, 不是Object.defineProperty. 复数形式
var book = {}
// 以下代码在book对象上定义了两个数据属性（_year和edition） 一个访问器属性（year)
Object.defineProperties(book, {
    _year: {
        writable: true,
        value: 2004
    },
    edition: {
        writable: true,
        value: 1
    },
    year: {
        get: function() {
            return this._year
        },
        set: function(newValue) {
            if (newValue > 2004) {
                this._year = newValue
                this.edition += newValue - 2004
            }
        }
    }
})

/* 6.1.3 读取属性的特性 */
/* Object.getOwnPropertyDescriptor(objName, attrName) 返回一个包含属性的对象 */
var book = {}
Object.defineProperties(book, {
    // 定义book对象的数据属性
    _year: {
        value: 2004
    },
    edition: {
        value: 1
    },
    // 定义book对象的访问器属性
    year: {
        get: function() {
            return this._year
        },
        set: function(newValue) {
            if (newValue > 2004) {
                this._year = newValue
                this.edition += newValue - 2004
            }
        }
    }
})
// 读取book对象的数据属性和访问器属性
var descriptorEdition = Object.getOwnPropertyDescriptor(book, 'edition')
log(descriptorEdition)
// Object {value: 1, writable: false, enumerable: false, configurable: false}
var descriptorYear = Object.getOwnPropertyDescriptor(book, 'year')
log(descriptorYear.get)
// function(){return this._year}


/* 6.2 创建对象 */
/* 6.2.1 工厂模式 */
var createPerson = function(name, age, job) {
    var person = new Object()
    person.name = name
    person.age = age
    person.job = job
    person.sayName = function() {
        return this.name
    }
    return person
}
var person1 = new Person('allen', 15, 'engineer')
var person2 = new Person('tom', 18, 'assistant')

log(person1 instanceof Object)              // true
log(person1 instanceof createPerson)        // false
log(person2 instanceof Object)              // true
log(person2 instanceof createPerson)        // false
/*
    工厂模式没有解决对象识别的问题
*/


/* 6.2.2 构造函数模式*/
// 与ES6的类一样
var Person = function(name, age, job) {
    this.name = name
    this.age = age
    this.job = job
    this.sayName = function() {
        return this.name
    }
}
var person1 = new Person('allen', 15, 'engineer')
var person2 = new Person('tom', 18, 'assistant')
log(person1 instanceof Object)              // true
log(person1 instanceof Person)              // true
log(person2 instanceof Object)              // true
log(person2 instanceof Person)              // true

/*
    构造函数依然是一个函数
    不用new操作符来调用，就是一个普通函数
    任何函数只要使用new操作符来调用，就是一个构造函数
    所以构造函数并没有什么特别之处
*/
/* 1 当做普通函数调用，则在全局作用域内 */
var person = Person('Jack', 33, 'teacher')
log(window.sayName(), sayName())            // Jack Jack
/* 2 当做构造函数来调用，作为单独的一个实例 */
var person = new Person('Tom', 22, 'teacher')
log(person.sayName())                       // Tom
log(window.sayName())                       // Jack(全局变量依然是Jack)
/* 3 在另一个对象的作用域中调用 */
var o = new Object()
Person.apply(o, ['Allen', 15, 'Engineer'])
log(o.sayName())                            // Allen
log(o.name)                                 // Allen

/*
    构造函数模式存在的问题
    this.sayName = function(){} 等同于 this.sayName = new Function()
    每次创建一个实例时，其实例方法都要重新创建一个Function的实例
    构造函数模式实现了不同的作用域链和标识符解析
    但创建Function实例的机制是相同的。
    不同实例上的同名函数（方法）不是相同的
*/
log(person1.sayName == person2.sayName)     // false
var a = new Function()
var b = a
log(a == b)                                 // true

/*
    解决这一问题的方法 可以将方法函数放到构造函数外面
    但这样的方法成了全局变量
    在方法较多时，就需要定义多个全局变量
    没有达到封装性的要求
*/
var Person = function(name, age, job) {
    // 创建构造函数
    this.name = name
    this.age = age
    this.job = job
    // 添加对象方法
    this.sayName = sayName
}
var sayName = function() {
    // 在构造函数外部定义对象方法函数
    log(this.name)
}
var person1 = new Person('Nicholas', 21, 'SE')
var person2 = new Person('Greg',18, 'Doctor')
log(person1.sayName == person2.sayName)     // true

/* 6.2.3 原型模式 */
/*

*/
