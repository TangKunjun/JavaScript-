/*
 若干人围城一个圈，依次报数，报指定的数的人被淘汰，其他人继续从一开始报，知道最后一个人胜出
 用队列的方式来做，报数没有被淘汰的人排到队列尾部，淘汰的人被删除
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
queue.enqueue("张三");
queue.enqueue("李四");
queue.enqueue("王五");
queue.enqueue("赵六");
queue.enqueue("关羽");
queue.enqueue("张飞");
queue.enqueue("文丑");
queue.enqueue("颜良");


// endNum表示指定的数
function jgch(endNum) {
    var queue = new Queue();
    queue.enqueue("张三");
    queue.enqueue("李四");
    queue.enqueue("王五");
    queue.enqueue("赵六");
    queue.enqueue("关羽");
    queue.enqueue("张飞");
    queue.enqueue("文丑");
    queue.enqueue("颜良");


    var num = 0;
    while (queue.size() > 1) {
        num++;
        if (num===endNum) {
            queue.dequeue();
            num = 0;
        } else {
            queue.enqueue(queue.dequeue());
        }
    }
    return queue.toString();
}

// 报四被淘汰
console.log(jgch(4)) // 张飞获胜
console.log(jgch(5)) // 王五获胜
console.log(jgch(1)) // 颜良获胜