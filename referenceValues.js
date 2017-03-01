/*
    基本类型 primitive values
    引用类型 reference values
  是JS当中的两种变量类型
*/

// 定义自己的log函数
const log = function() {
    console.log.apply(console, arguments)
}

// Object类型
// 创建Object实例方法 1 使用构造函数
var obj_1 = new Object()
obj_1.name = 'Allen'
obj_1.age = 18
obj_1.showme = function() {
    log('My name is ', this.name)
    log('My age is', this.age)
}
/*
    new 操作符，后跟构造函数Object()
    构造函数Object（）为实例obj_1定义了默认的属性和方法
    也可以讲，实例obj_1从Object类型继承了默认的属性和方法
*/

// 创建Object实例方法 2 对象字面量
var obj_2 = {
    name: 'Allen',
    age: 18,
    showme: function(){
        log('My name is ', this.name)
        log('My age is', this.age)
    }
}

// 创建Object实例方法 3 对象字面量2
var obj_3 = {}          // 与new Object()相同
obj_3.name = 'Allen'
obj_3.age = 18
obj_3.showme = function() {
    log('My name is ', this.name)
    log('My age is', this.age)
}
/*
    上述三种方式都可以创建一个Object实例
    对象字面量方法创建Object实例时，实际上并未调用Object()构造函数
*/

// Array 类型
// 创建数组的方法, 数组内的每一项可以是任何类型的值
var arr_1 = new Array()
var arr_2 = Array()
var arr_3 = ['allen', 18, [1, 2], {name: 'allen', age: 18}]
var arr_4 = []
var arr_5 = new Array(3)
var arr_6 = new Array('blue', 'red')

// 数组通过索引值读取、修改每一项
log(arr_3[0], arr_3[2][1], arr_3[3].name)
arr_6[0] = 'grey'
log(arr_6[0])

// 数组的length属性, length可以读取，也可以修改（修改时改变数组长度，会增加或删除数组项）
var nums = [0, 1, 2, 3, 4]
log(nums.length)

nums.length = 4
log(nums)

nums[nums.length] = 10
log(nums)

nums[10] = 11
log(nums.length)               // 11 中间项用undefined来填充

// 数组检测
/*
    instanceof 和 Array.isArray()方法都可以检测一个变量是否是Array类型实例
    区别在于，instanceof只能在同一个全局变量中的变量进行检测，当变量从另一个全局环境中引入时
    可能存在两个不同版本的Array构造函数，这样instanceof检测就会失败
    Array.isArray(value) 解决了上述问题
    但Array.isArray(value)对于较低版本的浏览器存在兼容性问题
*/
var check_1 = nums instanceof Array
var check_2 = Array.isArray(nums)
log(check_1, check_2)

// 数组 转换方法
/*
    toString(), toLocaleString(), valueOf()
    前两者，分别将数组中的每一项调用toString()和toLocaleString()方法，然后将其拼接
    valueOf()返回的则还是数组
*/
var arrTrans = ['blue', 1, 'allen', 'hello world']
log(arrTrans.toString())            // blue,1,allen,hello world
log(arrTrans.toLocaleString())      // blue,1,allen,hello world
log(arrTrans.valueOf())             // ["blue", 1, "allen", "hello world"]
/*
    join()方法
    对数组中每一项调用toString()方法
    参数为空，或undefined时，默认以','拼接
    参数不为空时，只能传入一个参数，即用来拼接字符串的分隔符
    当数组中某一项为null或undefined时，返回的结果中以空字符串表示
*/
log(arrTrans.join())                // blue,1,allen,hello world
log(arrTrans.join(','))             // blue,1,allen,hello world
log(arrTrans.join('||'))            // blue||1||allen||hello world
log(arrTrans.join('&'))             // blue&1&allen&hello world

// join()方法类似于以下函数
var joinArr = function(arr, separator = ',') {
    var result = arr[0].toString()
    if(separator === undefined) {
        separator = ','
    }
    for (let i = 1; i < arr.length; i++) {
        result += separator + arr[i].toString()
    }
    return result
}

// 栈方法
/*
    栈，后进先出LIFO的一种数据结构，栈中项的插入和移除，都必须发生在栈的顶部
    对于数组而言，其类似的栈操作发生在数组的末尾最后一个元素
    插入元素使用push(value)方法，返回新字符串的length属性
    移除元素使用pop()方法，返回被移除的元素，即原来数组的最后一项
*/
var animals = ['cat', 'dog']
var aniLen = animals.push('pig')
log(animals, aniLen)                // ["cat", "dog", "pig"] 3

var lastAni = animals.pop()
log(animals, lastAni)               // ["cat", "dog"] "pig"
// push 和 pop方法可以自己实现
var pushArr = function(arr, element) {
    arr[arr.length] = element
    return arr.length
}
var popArr = function(arr) {
    var len = arr.length - 1
    var result = arr[len]
    arr.length = len
    return result
}

// 队列方法
/*
    FIFO, 先进先出规则。即末尾添加，前端移除
    使用push()方法和shift()方法实现，shift()方法返回移除的一项
    JS还添加了与shift对应的unshift()方法，用来为数组在前端插入项，返回新数组的长度
*/
var animals = ['cat', 'dog']
animals.push('pig')
log(animals)                        // ["cat", "dog", "pig"]
var firstAni = animals.shift()
log(firstAni, animals)              // cat ["dog", "pig"]
var newLen = animals.unshift('sheep')
log(newLen, animals)                // 3 ["sheep", "dog", "pig"]

// shift()方法实现
var shiftArr = function(arr) {
    var len = arr.length
    if(len === 0) {
        return '数组为空'
    }
    var result = arr[0]
    for (var i = 0; i < len; i++) {
        arr[i] = arr[i + 1]
    }
    arr.length = len - 1
    return result
}

// 排序方法
/*
    reverse() sort()方法
    reverse()方法翻转数组排序
    sort()方法无参数时，默认按照升序排列，可以加参数
    sort()是先将每一项调用toString()方法，然后再来排序
    sort()可以传入比较函数作为参数
*/
var values = [1, 5, 10, 15, 20, 25, 30]
log(values.reverse())               // [30, 25, 20, 15, 10, 5, 1]
/* sort()方法，先调用toString()方法 比较的是‘1’， ’10‘等字符串的排序*/
log(values.sort())                  // [1, 10, 15, 20, 25, 30, 5]

// 一个基本通用的比较函数
const compare = function(val1, val2) {
    if (val1 < val2) {
        return -1
    } else if(val1 > val2) {
        return 1
    }else {
        return 0
    }
}
values.sort(compare)
log(values)                         // [1, 5, 10, 15, 20, 25, 30]

// 操作方法
/*
    concat()方法基于当前数组创建一个新数组，并将参数内的项添加到新数组的末尾
    slice()方法复制数组内的某一项或某几项，返回一个新数组
    splice()方法可以修改原数组，并返回被修改的项。功能最强大。
*/
var animals = ['pig', 'cat', 'dog']
// 复制数组['pig', 'cat', 'dog']
var animals_2 = animals.concat()
// 尾部添加项['pig', 'cat', 'dog', 'monkey']
var animals_3 = animals.concat('monkey')
// 添加数组['pig', 'cat', 'dog', 'monkey', 'dolphin']
var animals_4 = animals.concat(['monkey', 'dolphin'])
// 添加项和数组
var animals_5 = animals.concat('monkey', ['dolphin', 'bird'])
log(animals_5)                  // ["pig", "cat", "dog", "monkey", "dolphin", "bird"]

// slice()接收一或两个参数, 不修改原数组
var animals_6 = animals_5.slice(2)
log(animals_6)                  // ["dog", "monkey", "dolphin", "bird"]
var animals_7 = animals_5.slice(2, 4)
log(animals_7)                  // ["dog", "monkey"]

// splice() 删除 插入 替换
var numbers = [2, 4, 6, 8, 10]
// delete splice(index, num), splice(0)会将所有项删除，返回一个空数组
var removed = numbers.splice(0, 2)
log(numbers)                    // [6, 8, 10]
log(removed)                    // [2, 4]
// insert splice(index, 0, elements)
removed = numbers.splice(1, 0, 1, 3, 5)
log(numbers)                    // [6, 1, 3, 5, 8, 10]
log(removed)                    // []
// replace splice(index, num, elements)
removed = numbers.splice(1, 3, 2, 4, 12)
log(numbers)                    // [6, 2, 4, 12, 8, 10]
log(removed)                    // [1, 3, 5]

// 位置方法
/*
    查询某个元素在数组中的下标（索引），使用indexOf()或者lastIndexOf()方法
    indexOf()返回从0开始的一个下标
    lastIndexOf()返回从array.length-1开始的一个下标
    indexOf() lastIndexOf()方法都是仅仅查询一次，找到即返回，查询不到则返回-1
*/
var nums = [1, 2, 3, 4, 3, 2, 1]
var index = nums.indexOf(3)
log(index)                      // 2
var lastIndex = nums.lastIndexOf(3)
log(lastIndex)                  // 4
var indexUn = nums.indexOf(10)
log(indexUn)                    // -1

// 迭代方法
/*
    every():    对数组中每一项运行给定函数，如果该函数对 每 一项都返回true，则返回true
    some():     对数组中每一项运行给定函数，如果该函数对 任 一项都返回true，则返回true
    forEach():  对数组中每一项运行给定函数，此方法没有返回值
    filter():   对数组中每一项运行给定函数，返回由该函数会返回true的项组成的数组
    map():      对数组中每一项运行给定函数，返回由该函数调用结果组成的数组
    arr.method(function(item, index, array){
        codes here
    })
*/
var numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
var comp = function(x) {
    if(x > 5) {
        return true
    }
}
var resultEvery = numbers.every(comp)
log(resultEvery)                // false

var resultSome = numbers.some(comp)
log(resultSome)                 // true

var resultFilter = numbers.filter(comp)
log(resultFilter)               // [6, 7, 8, 9, 10]
// 与如下代码一样
var everyResult = numbers.every(function(item, index, array){
    if(item > 5){
        return true
    }
})
log(everyResult)                // false

var resultMap = numbers.map(function(item, index){
    return item + 1
})
log(resultMap)                  // [2, 3, 4, 5, 6, 7, 8, 9, 10, 11]


numbers.forEach(function(index, item){
    log(index, item)            // forEach方法可看做一个for语句来使用，效果完全相同
})
for (let i = 0; i < numbers.length; i++) {
    log(numbers[i])
}

// 归并方法
/*
    reduce() reduceRight() 方向不同，别无二致
    arr.reduce(function(prevent, current, index, array){
        codes here
    }, [baseValue])
    reduce对每一项调用函数，然后该函数的结果会被当做 前一个值 传入该函数参与下一次计算
    其迭代过程从数组的第二项开始
*/
// 计算数组的和
var values = [1, 2, 3, 4, 5]
var sum = values.reduce(function(prev, curr, index, array){
    let result = prev + curr
    log('前一项', prev, '当前值', curr, '当前运算值', result)
    return result
})
log('最终结果', sum)
/*  结果
    前一项 1 当前值 2 当前运算值 3
    前一项 3 当前值 3 当前运算值 6
    前一项 6 当前值 4 当前运算值 10
    前一项 10 当前值 5 当前运算值 15
    最终结果 15
*/
var sumRight = values.reduceRight(function(prev, curr, index, array){
    let result = prev + curr
    log('前一项', prev, '当前值', curr, '当前运算值', result)
    return result
})
log('最终结果', sumRight)
/*  结果
    前一项 5 当前值 4 当前运算值 9
    前一项 9 当前值 3 当前运算值 12
    前一项 12 当前值 2 当前运算值 14
    前一项 14 当前值 1 当前运算值 15
    最终结果 15
*/
