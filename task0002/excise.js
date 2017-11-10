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

/**
 * mini $
 * 
 * @param {any} selector 
 * @returns 
 */
function $(selector) {
    var idReg = /^#([\w\-]+)/
    var classReg = /^\.([\w\-]+)/
    var tagReg = /\w+$/i
    var attrReg = /(\w+)?\[([^=\]]+)(?:=(["'])?([^\]"'])\3?)?\])?/

    function blank() {}

    function direct(part, action) {
        action = action || {
            id: blank,
            className: blank,
            tag: blank,
            attribute: blank,
        }

        var fn;
        var params = [].slice.call(arguments, 2)
        if (result = part.match(idReg)) {
            fn = "id"
            params.push(result[1])
        } else if (result = part.match(classReg)) {
            fn = "className"
            params.push(result[1])
        } else if (result = part.match(tagReg)) {
            fn = "tag"
            params.push(result[0])
        } else if (result = part.match(attrReg)) {
            fn = "attribute"
            var tag = result[1]
            var key = result[2]
            var value = result[4]
            params.push(tag, key, value)
        }
        return action[fn].apply(this, params)
    }

    function find(parts, context) {
        var part = parts.pop()

        var action = {
            id: function(id) {
                return document.getElementById(id)
            },
            className: function(className) {
                var result = []
                if (context.getElementsByClassName) {
                    result = context.getElementsByClassName(className)
                } else {
                    var temp = context.getElementsByTagName("*")
                    for (var i = 0; i < temp.length; i++) {
                        var node = temp[i]
                        if (hasClass(node, className)) {
                            result.push(node)
                        }
                    }
                }
                return result
            },
            tag: function(tag) {
                return document.getElementsByTagName(tag)
            },
            attribute: function(tag, key, value) {
                var result = []
                var temp = context.getElementsByTagName(tag || "*")
                for (var i = 0; i < temp.length; i++) {
                    var node = temp[i]
                    if (value) {
                        var v = node.getAttribute(key)
                        if (v === value) {
                            result.push(node)
                        }
                    } else if (node.hasAttribute(key)) {
                        result.push(node)
                    }
                }
                return result
            },
        }

        var ret = direct(part, action)
        ret = [].slice.call(ret)

        return parts[0] && ret[0] ? filterParents(parts, ret) : ret
    }

    function filterParents(parts, ret) {
        var parentParts = parts.pop()
        var result = []

        for (var i = 0; i < ret.length; i++) {
            var node = ret[i]
            var p = node

            while(p = p.parentNode) {
                var action = {
                    id: function(el, id) {
                        return (el === id)
                    },
                    className: function(el, className) {
                        return hasClass(el, className)
                    },
                    tag: function(el, tag) {
                        return (el.tagName.toLowerCase() === tag)
                    },
                    attribute: function(el, tag, key, value) {
                        var valid = true
                        if (tag) {
                            valid = valid && (value === el.getAttribute(key))
                        }
                        return valid
                    },
                }
                var matches = direct(parentParts, action, p)

                if (matches) {
                    break
                }
            }
            return parts[0] && result[0] ? filterParents(parts, result) : result
        }
    }

    var result = find(selector.split(/\s+/), context)

    return result
}