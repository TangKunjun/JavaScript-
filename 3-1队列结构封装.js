/*
基于数组实现
*/

function Queue() {
    this.items = [];

    // 队列尾部添加一个或多个新项
    Queue.prototype.enqueue = function (item) {
        this.items.push(item);
        return this.items.length;
    };

    // 删除第一个并返回第一个的元素(用数组性能会比较低，删除第一个 后面的要依次前推)
    Queue.prototype.dequeue = function () {
        return this.items.shift();
    }

    // 返回第一个元素
    Queue.prototype.front = function () {
        return this.items[0];
    }

    // 如果没有任何元素就返回true
    Queue.prototype.isEmpty = function () {
        return !this.items.length;
    }

    // 返回栈的大小
    Queue.prototype.size = function () {
        return this.items.length;
    }

    Queue.prototype.toString = function () {
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

var queue = new Queue();

queue.enqueue(2);
queue.enqueue(4);
queue.enqueue(16);

console.log(queue.dequeue());
console.log(queue.front())
console.log(queue.isEmpty())
console.log(queue.size())
console.log(queue.toString())
