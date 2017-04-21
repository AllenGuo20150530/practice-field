// 写一个2048的小游戏，用于教学，也用于练习


// 定义自己的log函数
var log = function() {
    console.log.apply(console, arguments)
}

// 右移： 将非零元素移动到数组最末尾，并将前面元素置零
var moveR = function(arr) {
    var i = 0
    while (i < 4) {
        findR(arr)
        i = i + 1
    }
}

var findR = function(arr) {
    if (arr[3] === 0) {
        arr[3] = arr[2]
        arr[2] = arr[1]
        arr[1] = arr[0]
        arr[0] = 0
    }
    if (arr[2] === 0) {
        arr[2] = arr[1]
        arr[1] = arr[0]
        arr[0] = 0
    }
    if (arr[1] === 0) {
        arr[1] = arr[0]
        arr[0] = 0
    }
}
// var t = [2, 2, 0, 2]
// moveR(t)
// 左移： 将非零元素移动到数组最末尾，并将前面元素置零
var moveF = function(arr) {
    var i = 0
    while (i < 4) {
        findF(arr)
        i = i + 1
    }
}

var findF = function(arr) {
    if (arr[0] === 0) {
        arr[0] = arr[1]
        arr[1] = arr[2]
        arr[2] = arr[3]
        arr[3] = 0
    }
    if (arr[1] === 0) {
        arr[1] = arr[2]
        arr[2] = arr[3]
        arr[3] = 0
    }
    if (arr[2] === 0) {
        arr[2] = arr[3]
        arr[3] = 0
    }
}
// var t = [2, 2, 0, 2]
// moveF(t)

var sumR = function(arr) {
    // 假设arr[3]不等于0
    if (arr[3] === arr[2]) {
        arr[3] = arr[3] + arr[2]
        arr[2] = 0
        if (arr[1] === arr[0]) {
            arr[2] = arr[1] + arr[0]
            arr[1] = 0
            arr[0] = 0
        } else {
            arr[2] = arr[1]
            arr[1] = arr[0]
            arr[0] = 0
        }
    } else {
        if (arr[2] === arr[1]) {
            arr[2] = arr[2] + arr[1]
            arr[1] = arr[0]
            arr[0] = 0
        } else {
            if (arr[1] === arr[0]) {
                arr[1] = arr[1] + arr[0]
                arr[0] = 0
            }
        }
    }
}
var sumF = function(arr) {
    // 假设arr[0]不等于0
    if (arr[0] === arr[1]) {
        arr[0] = arr[0] + arr[1]
        arr[1] = 0
        if (arr[2] === arr[3]) {
            arr[1] = arr[2] + arr[3]
            arr[2] = 0
            arr[3] = 0
        } else {
            arr[1] = arr[2]
            arr[2] = arr[3]
            arr[3] = 0
        }
    } else {
        if (arr[1] === arr[2]) {
            arr[1] = arr[1] + arr[2]
            arr[2] = arr[3]
            arr[3] = 0
        } else {
            if (arr[2] === arr[3]) {
                arr[2] = arr[2] + arr[3]
                arr[3] = 0
            }
        }
    }
}
