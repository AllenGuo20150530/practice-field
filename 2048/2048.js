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
// 寻找零元素，并右移非零元素
var findR = function(arr) {
    for (var raw = 0; raw < arr.length; raw++) {
        if (arr[raw][3] === 0) {
            arr[raw][3] = arr[raw][2]
            arr[raw][2] = arr[raw][1]
            arr[raw][1] = arr[raw][0]
            arr[raw][0] = 0
        }
        if (arr[raw][2] === 0) {
            arr[raw][2] = arr[raw][1]
            arr[raw][1] = arr[raw][0]
            arr[raw][0] = 0
        }
        if (arr[raw][1] === 0) {
            arr[raw][1] = arr[raw][0]
            arr[raw][0] = 0
        }
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
// 寻找零元素，并左移非零元素
var findF = function(arr) {
    for (var raw = arr.length - 1; raw >= 0; raw--) {
        if (arr[raw][0] === 0) {
            arr[raw][0] = arr[raw][1]
            arr[raw][1] = arr[raw][2]
            arr[raw][2] = arr[raw][3]
            arr[raw][3] = 0
        }
        if (arr[raw][1] === 0) {
            arr[raw][1] = arr[raw][2]
            arr[raw][2] = arr[raw][3]
            arr[raw][3] = 0
        }
        if (arr[raw][2] === 0) {
            arr[raw][2] = arr[raw][3]
            arr[raw][3] = 0
        }
    }

}
// var t = [2, 2, 0, 2]
// moveF(t)

var sumR = function(arr) {
    // 向右求和
    // 假设arr[3]不等于0
    for (var raw = 0; raw < arr.length; raw++) {
        if (arr[raw][3] === arr[raw][2]) {
            arr[raw][3] = arr[raw][3] + arr[raw][2]
            arr[raw][2] = 0
            if (arr[raw][1] === arr[raw][0]) {
                arr[raw][2] = arr[raw][1] + arr[raw][0]
                arr[raw][1] = 0
                arr[raw][0] = 0
            } else {
                arr[raw][2] = arr[raw][1]
                arr[raw][1] = arr[raw][0]
                arr[raw][0] = 0
            }
        } else {
            if (arr[raw][2] === arr[raw][1]) {
                arr[raw][2] = arr[raw][2] + arr[raw][1]
                arr[raw][1] = arr[raw][0]
                arr[raw][0] = 0
            } else {
                if (arr[raw][1] === arr[raw][0]) {
                    arr[raw][1] = arr[raw][1] + arr[raw][0]
                    arr[raw][0] = 0
                }
            }
        }
    }

}
var sumF = function(arr) {
    // 向左求和
    // 假设arr[0]不等于0
    for (var raw = arr.length - 1; raw >= 0; raw--) {
        if (arr[raw][0] === arr[raw][1]) {
            arr[raw][0] = arr[raw][0] + arr[raw][1]
            arr[raw][1] = 0
            if (arr[raw][2] === arr[raw][3]) {
                arr[raw][1] = arr[raw][2] + arr[raw][3]
                arr[raw][2] = 0
                arr[raw][3] = 0
            } else {
                arr[raw][1] = arr[raw][2]
                arr[raw][2] = arr[raw][3]
                arr[raw][3] = 0
            }
        } else {
            if (arr[raw][1] === arr[raw][2]) {
                arr[raw][1] = arr[raw][1] + arr[raw][2]
                arr[raw][2] = arr[raw][3]
                arr[raw][3] = 0
            } else {
                if (arr[raw][2] === arr[raw][3]) {
                    arr[raw][2] = arr[raw][2] + arr[raw][3]
                    arr[raw][3] = 0
                }
            }
        }
    }

}

// moveU, moveD
/*
    game2048 = [
                [2, 0, 2, 4],
                [0, 4, 0, 8],
                [0, 4, 8, 16],
                [2, 0, 0, 0]
    ]
*/
// 上移： 将非零元素移动到数组最顶端，并将下面元素置零
var moveU = function(arr) {
    var i = 0
    while (i < 4) {
        findU(arr)
        i = i + 1
    }
}
// 在垂直方向上寻找零元素，并上移非零元素
var findU = function(arr) {
    // 参数 col 为当前arr数组的列，game2048[raw][col]
    for (var col = 0; col < 4; col++) {
        if (arr[0][col] === 0) {
            arr[0][col] = arr[1][col]
            arr[1][col] = arr[2][col]
            arr[2][col] = arr[3][col]
            arr[3][col] = 0
        }
        if (arr[1][col] === 0) {
            arr[1][col] = arr[2][col]
            arr[2][col] = arr[3][col]
            arr[3][col] = 0
        }
        if (arr[2][col] === 0) {
            arr[2][col] = arr[3][col]
            arr[3][col] = 0
        }
    }
}

var sumU = function(arr) {
    // 向上求和
    for (var col = 0; col < arr.length; col++) {
        if (arr[0][col] === arr[1][col]) {
            arr[0][col] = arr[0][col] + arr[1][col]
            arr[1][col] = 0
            if (arr[2][col] === arr[3][col]) {
                arr[1][col] = arr[2][col] + arr[3][col]
                arr[2][col] = 0
                arr[3][col] = 0
            } else {
                arr[1][col] = arr[2][col]
                arr[2][col] = arr[3][col]
                arr[3][col] = 0
            }
        } else {
            if (arr[1][col] === arr[2][col]) {
                arr[1][col] = arr[1][col] + arr[2][col]
                arr[2][col] = arr[3][col]
                arr[3][col] = 0
            } else {
                if (arr[2][col] === arr[3][col]) {
                    arr[2][col] = arr[2][col] + arr[3][col]
                    arr[3][col] = 0
                }
            }
        }
    }
}

// 上移： 将非零元素移动到数组最顶端，并将下面元素置零
var moveD = function(arr) {
    var i = 0
    while (i < 4) {
        findD(arr)
        i = i + 1
    }
}
// 在垂直方向上寻找零元素，并上移非零元素
var findD = function(arr) {
    // 参数 col 为当前arr数组的列，game2048[raw][col]
    for (var col = 3; col >= 0; col--) {
        if (arr[3][col] === 0) {
            arr[3][col] = arr[2][col]
            arr[2][col] = arr[1][col]
            arr[1][col] = arr[0][col]
            arr[0][col] = 0
        }
        if (arr[2][col] === 0) {
            arr[2][col] = arr[1][col]
            arr[1][col] = arr[0][col]
            arr[0][col] = 0
        }
        if (arr[1][col] === 0) {
            arr[1][col] = arr[0][col]
            arr[0][col] = 0
        }
    }
}

var sumD = function(arr) {
    // 向上求和
    for (var col = 3; col >= 0; col--) {
        if (arr[3][col] === arr[2][col]) {
            arr[3][col] = arr[3][col] + arr[2][col]
            arr[2][col] = 0
            if (arr[1][col] === arr[0][col]) {
                arr[2][col] = arr[1][col] + arr[0][col]
                arr[1][col] = 0
                arr[0][col] = 0
            } else {
                arr[2][col] = arr[1][col]
                arr[1][col] = arr[0][col]
                arr[0][col] = 0
            }
        } else {
            if (arr[2][col] === arr[1][col]) {
                arr[2][col] = arr[2][col] + arr[1][col]
                arr[1][col] = arr[0][col]
                arr[0][col] = 0
            } else {
                if (arr[1][col] === arr[0][col]) {
                    arr[1][col] = arr[1][col] + arr[0][col]
                    arr[0][col] = 0
                }
            }
        }
    }
}
