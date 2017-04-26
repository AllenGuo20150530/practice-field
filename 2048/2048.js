// 写一个2048的小游戏，用于教学，也用于练习
/*
    * 1. 将游戏简化为数组元素的移动问题
        game2048 = [
            [0, 0, 2, 2],
            [2, 4, 8, 16],
            [0, 2, 0, 0],
            [0, 2, 4, 8],
        ]

    * 2. 拆开成小问题： 每个子数组上的元素移动，全部元素的移动
            （每个函数进行优化，简洁高效，复用性高）
    * 3. 每次移动后，零元素的位置进行数字填充
    * 4. 通过调用函数，模拟游戏操作
    * 5. 编写game2048界面框架
    * 6. 绑定事件： （一）鼠标点击按钮操作； （二）键盘方向键操作
    * 7. 优化界面

*/

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
var moveL = function(arr) {
    var i = 0
    while (i < 4) {
        findL(arr)
        i = i + 1
    }
}
// 寻找零元素，并左移非零元素
var findL = function(arr) {
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
var sumL = function(arr) {
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


// 将数组中，其中两个零元素，替换为非零元素 2
var init2 = function(arr) {
    // 遍历，找到所有零元素的索引
    let zeros = []
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length; j++) {
            if (arr[i][j] === 0) {
                // 如果当前元素为零，则将其转换成字符串，存储在zeros中
                let index = i.toString() + j.toString()
                zeros.push(index)
            }
        }
    }
    log(zeros)
    // 使用随机数来挑选其中两个零元素的索引
    // 取得zeros长度
    let len = zeros.length
    let random = Math.random()
    // 函数名也仅仅是一个引用，可以赋值给其他变量
    let floor = Math.round
    let position = floor(random * len)
    log(position)
    // 将索引字符串变换为数字，并将所在位置元素值 = 2
    let element = zeros[position]
    log(element)
    let i = parseInt(element[0])
    let j = parseInt(element[1])
    arr[i][j] = 2
}

// 打印所有元素
var print = function(arr) {
    for (var i = 0; i < arr.length; i++) {
        console.log(arr[i])
    }
}

var init = function() {
    var game2048 = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ]
    init2(game2048)
    init2(game2048)
    return game2048
}
// 操作，一起来玩游戏
var moveRight = function(arr) {
    moveR(arr)
    sumR(arr)
    init2(arr)
    print(arr)
}
var moveLeft = function(arr) {
    moveL(arr)
    sumL(arr)
    init2(arr)
    print(arr)
}
var moveUp = function(arr) {
    moveU(arr)
    sumU(arr)
    init2(arr)
    print(arr)
}
var moveDown = function(arr) {
    moveD(arr)
    sumD(arr)
    init2(arr)
    print(arr)
}
