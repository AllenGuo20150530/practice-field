// 写一个2048的小游戏，用于教学，也用于练习


// 定义自己的log函数
var log = function() {
    console.log.apply(console, arguments)
}

// 求数组的长度
var lengthArray = function(arr) {
    var i = 0
    while (a[i] != 'undefined') {
        i = i + 1
    }
    return i
}
var lengthArr = function(arr) {
    for (var i = 0; ; i++) {
        if(arr[i] != 'undefined') {
            i = i + 1
        } else {
            return i
        }
    }
}
// 数组操作， 去掉最后一个元素，长度不变，元素右移，最前端元素变为0
var moveR = function(arr) {
    var len = arr.length
    for (var i = len; i > 0; i--) {
        arr[i - 1] = a[i - 2]
    }
    a[0] = 0
}



/*
    问题
    假设有一个数组arr, 判断其最会一个元素是否为0
    若arr[-1] != 0, 则数组不变
    若arr[-1] == 0, 则前面元素全部右移一位，a[0] = 0 来补位
    若arr[-1] == 0，则前面元素继续右移一位，a[0] = 0 来补位
    直到arr[-1] != 0
*/
var transArray = function(arr) {
    var len = arr.length
    while (arr[-1] != 0) {
        for(var i = arr.length - 1; i >= 0; i--) {
            a[i] = a[i - 1]
        }
        a[0] = 0
    }
}
var a = [2, 0, 0, 4, 0]
transArray(a)
console.log(a)      // [0, 2, 0, 0, 4]

var b = [2, 0, 0, 4, 0, 0]
transArray(b)
log(b)              // [0, 0, 2, 0, 0, 4]

/*  问题1
    假设有一个数组 a = [2, 0, 2, 4]
    和一个函数moveRight(arr), 输入值为数组
    经过函数moveRight(arr)之后，变为数组a = [0, 0, 4, 4]
    继续调用函数moveRight(arr)，则变为a = [0, 0, 0, 8]
    请将函数moveRight(arr)实现
*/
/*
    解题思路 和 伪代码
    先判断最后两个值是否相等
    a[3] == a[2] ?
        Yes => a[3] = a[3] + a[2], a[2] = a[1], a[1] = a[0], a[0] = 0
            a[2] == a[1] ?
                Yes => a[2] = a[2] + a[1], a[1] = a[0], a[0] = 0
        No  => a[2] =
*/
var moveRight = function(arr) {

}

// 2048里最常用的一个小模块是判断求和, 两值相等返回sum，两值不等返回false
var getSum = function(value1, value2) {
    // 由于从页面上取得的值是字符串，所以要转化成整数
    value1 = parseInt(value1)
    value2 = parseInt(value2)

    // 判断value1 和value2是否相等，如果相等则相加
    if (value1 === value2) {
        return value1 + value2
    }else {
        return false
    }
}

// 从页面每个方格内取值，用于计算求和
var getNumber = function() {
    var value1 = document.querySelector('')
}
