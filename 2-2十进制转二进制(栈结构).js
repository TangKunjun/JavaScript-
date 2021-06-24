/*
基于数组实现
*/

function Stack() {
    this.items = [];

    // 添加一个元素到栈顶的位置
    Stack.prototype.push = function (item) {
        this.items.push(item);
        return this.items.length;
    };

    // 删除栈顶元素
    Stack.prototype.pop = function () {
        return this.items.pop();
    }

    // 返回栈顶元素
    Stack.prototype.peek = function () {
        return this.items[this.items.length - 1];
    }

    // 如果没有任何元素就返回true
    Stack.prototype.isEmpty = function () {
        return !this.items.length;
    }

    // 返回栈的大小
    Stack.prototype.size = function () {
        return this.items.length;
    }

    // 以字符串的形式展示栈
    Stack.prototype.toString = function () {
        var str = "";
        this.items.forEach(function (item) {
            if (str) {
                str = str + "," + item;
            } else {
                str += item;
            }
        })
        return str;
    }
}

// 栈的使用

var stack = new Stack();

function dec2tobin(number) {
    while (number > 0) {
        stack.push(number%2);
        number = Math.floor(number / 2);
    }
    var result = "";
    while (!stack.isEmpty()) {    // 循环依次将栈顶弹出
        result += stack.pop();
    }
    return result
}



console.log(dec2tobin(65100))