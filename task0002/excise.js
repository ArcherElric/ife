var log = console.log.bind(console)

function classof(o) {
    if (typeof o === "null") return "Null"
    if (typeof o === "undefined") return "Undefined"
    return Object.prototype.toString.call(o).slice(8, -1)
}

function cloneObject(ob) {
    if (classof(ob) === "Function" || classof(ob) === "RegExp") return "Error"
    if (classof(ob) === "Object") {
        var ob2 = {}
        for (var key in ob) {
            if (typeof ob[key] === "function" || classof(ob[key]) === "RegExp") {
                continue
            } else {
                ob2[key] = ob[key]
            }
        }
    } else {
        var ob2 = ob
    }
    return ob2
}

function uniqArray(array) {
    var o = []
    for (var i = 0; i < array.length; i++) {
        if (o.indexOf(array[i]) == -1) {
            o.push(array[i])
        }
    }
    return o
}

function trim(o) {
    return o.replace(/^\s+|\s+$/g, "")
}

function each(arr, fn) {
    //循环数列arr得到各个元素
    //然后把各元素传入fn
    //fn接受两个参数item和index，这里是难点
    for (var i = 0; i < arr.length; i++) {
        var element = arr[i]
        fn(element, i)
    }
}

function getObjectLength(obj) {
    //只获取第一层元素的数量
    var num = 0
    for (var key in obj) {
        num++
    }
    return num
}

function isEmail(emailstr) {
    var reg = /^(\w+\.)*\w+@\w+(\.\w+)*$/
    return reg.test(emailstr)
}

function isPhone(num) {
    var reg = /^1\d{10}$/
    return reg.test(num)
}


function addClass(element, newCLassName) {
    //为element添加一个样式名为newClassName的新样式
    if (!element.className) {
        element.className = newCLassName
    } else {
        var value = element.className
        value += " "
        value += newCLassName
        element.className = value
    }
}

function removeClass(element, oldClassName) {
    var reg = new RegExp("(\\s|^)" + oldClassName + "(\\s|$)")
    element.className = element.className.replace(reg, "")
}

function isSiblingNode(element, siblingNode) {
    //判断siblingNode和element是否为同一个父元素下的同一级元素，返回bool值
    return element.parentNode === siblingNode.parentNode
}

function getPosition(element) {
    //获取element相对于浏览器窗口的位置，返回一个对象{x, y}
    var o = {}
    o.x = element.getBoundingClientRect().left + document.documentElement.scrollLeft
    o.y = element.getBoundingClientRect().top + document.documentElement.scrollTop
    return o 
}

function $() {
    var a = arguments[0]
    if (!a) return false
    var all = document.getElementsByTagName("*")
    var t = a.slice(0, 1)
    var o = a.slice(1)
    var reg_arr = /^\[(\w+)\]$/
    var reg_arr_sam = /^\[(\w+)=(\w+)\]$/g
    if (t === "#") {
        return document.getElementById(o)
    } else if (t === ".") {
        return document.getElementsByClassName(o)[0]
    } else if (reg_arr_sam.test(a)) {
        //按属性值查找
        var b = a.slice(1,-1)
        var array = b.split("=")
        for (var i = 0; i < all.length; i++) {
            if (all[i].hasAttribute(array[0])) {
                if (all[i].getAttribute(array[0]) === array[1]) {
                    return all[i]
                }
            }
        }
    } else if (reg_arr.test(a)) {
        var b = a.slice(1,-1)
        // var result = []
        for (var i = 0; i < all.length; i++) {
            if (all[i].hasAttribute(b)) {
                // result.push(all[i])
                return all[i]
            }
        }
        // return result
    } else if () {
        //组合查找
        }
}
