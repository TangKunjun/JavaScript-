/*
基于数组实现优先级队列
*/

function Queue() {
    this.items = [];


    function QueueElement(element, priority) {
        this.element = element;
        this.priority = priority;
    }


    // 实现插入方法
    Queue.prototype.enqueue = function (item, priority) {
        var queueElement = new QueueElement(item, priority);

        if (this.items.length) {
            var flag = false;
            for (var i = 0;i<this.items.length;i++) {
                if (this.items[i].priority > queueElement.priority) {
                    this.items.splice(i, 0, queueElement);
                    flag = true;
                    break;
                }
            }
            if (!flag) {
                this.items.push(queueElement)
            }
        } else {
            this.items.push(queueElement);
        }
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

    // 字符串化
    Queue.prototype.toString = function () {
        var str = "";
        this.items.forEach(function (item) {
            if (str) {
                str = str + "," + item.element;
            } else {
                str += item.element;
            }
        })
        return str;
    }
}

// 栈的使用

var queue = new Queue();

queue.enqueue(123, 123);
queue.enqueue(32, 32);
queue.enqueue(54, 54);
queue.enqueue(1, 1);
queue.enqueue(4, 4);
queue.enqueue(133, 54);

// console.log(queue.dequeue());
// console.log(queue.front())
// console.log(queue.isEmpty())
// console.log(queue.size())
console.log(queue.toString())
