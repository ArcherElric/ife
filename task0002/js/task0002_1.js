window.onload = function() {
    
    //step1
    var step1 = document.getElementsByClassName("step1")[0]
    var inputs = step1.getElementsByTagName("input")
    var text1 = inputs[0], btn1 = inputs[1]

    btn1.onclick = function() {
        var t = text1.value
        if (!t) return alert("error")
        var value = getHobby1(t)
        var p = createElem(value)
        insertAfter(p, btn1)
    }

    //step2
    var step2 = document.getElementsByClassName("step2")[0]
    var text2 = step2.getElementsByClassName()
}

var log = console.log.bind(console)

//util
function insertAfter(element, target) {
    var oParent = target.parentNode
    if (target == oParent.lastChild) {
        oParent.appendChild(element)
    } else {
        oParent.insertBefore(element, target.nextSibling)
    }
}

function createElem(str) {
    var p = document.createElement("p")
    var text = document.createTextNode("你的爱好是： " + str)
    p.appendChild(text)
    return p
}

//step1
function getHobby1(str) {
    var result = []
    var a = str.split("，")
    a.forEach(function(x) {
        if (result.indexOf(x) == -1) {
            result.push(x)
        }
    })
    return result
}

//step2
function 