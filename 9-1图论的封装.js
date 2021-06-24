/**
 * 创建图类
 * @constructor
 */

function Graph() {
    // 属性 顶点(数组) / 边(字典)
    this.vertex = [];
    this.edge = {};


    //方法
    /**
     * 添加顶点
     * @param v
     */
    Graph.prototype.addVertex = function (v) {
        this.vertex.push(v);
        this.edge[v] = [];
    }

    /**
     * 添加边
     * @param v1 顶点1
     * @param v2 顶点2
     */
    Graph.prototype.addEdge = function (v1, v2) {
        this.edge[v1].push(v2);
        // 有向图不需要写下面的代码
        this.edge[v2].push(v1);
    }

    /**
     * 打印
     */
    Graph.prototype.toString = function () {
        var returnString = "";
        
        for (var i=0;i<this.vertex.length;i++) {
            returnString+=this.vertex[i] + "-->";
            var edges = this.edge[this.vertex[i]];
            for (var j=0;j<edges.length;j++) {
                returnString += edges[j] + "  "
            }
            returnString+= "\n";
        }
        return returnString;
    }

    /**
     * 初始化颜色状态
     * 白色表示没有遍历，灰色表示该顶点被遍历了与他相连的顶点还没遍历，黑色表示该顶点被遍历相连的也被找到
     */
    Graph.prototype.initallColor = function () {
        var colors = [];
        for (var i=0;i<this.vertex.length;i++) {
            colors[this.vertex[i]] = "white"
        }
        return colors;
    }

    /**
     * 实现广度优先搜索
     * @param v 开始的顶点
     * @param handler 回调
     */
    Graph.prototype.bfs = function (initV, handler) {
        // 初始化颜色
        var color = this.initallColor();

        // 创建队列
        var queue = new Queue();
        // 将顶点加入到队列
        queue.enqueue(initV);
        // 循环队列中取出元素
        while(!queue.isEmpty()) {
            // 取出第一个元素
            var v = queue.dequeue();

            // 获取和顶点相连的顶点
            var vList = this.edge[v];
            // 将当前顶点变成灰色
            color[v] = "gray";
            // 遍历相连的节点并加入到队列
            for (var i=0;i<vList.length;i++) {
                var e = vList[i];
                if (color[e]==="white") {
                    color[e]="gray";
                    queue.enqueue(e);
                }
            }
            // 访问顶点
            handler(v);
            // 顶点设置为黑色
            color[v] = "black"
        }
    }


    /**
     * 实现深度优先搜索
     * @param v 开始的顶点
     * @param handler 回调
     */
    Graph.prototype.dfs = function (initV, handler) {
        // 初始化颜色
        var color = this.initallColor();

        this.dfsvisit(initV, color, handler);
    }
    /**
     * 深度函数的递归
     * @param v
     * @param color
     * @param handler
     */
    Graph.prototype.dfsvisit = function (v, color, handler) {
        // 将当前顶点变成灰色
        color[v] = "gray";
        // 处理顶点
        handler(v);
        // 获取和顶点相连的顶点
        var vList = this.edge[v];
        // 遍历相连的节点并加入到队列
        for (var i=0;i<vList.length;i++) {
            var e = vList[i];
            if (color[e]==="white") {

                this.dfsvisit(e, color, handler);
            }
        }

        color[v] = "black";
    }
}


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


var g = new Graph();
g.addVertex("A");
g.addVertex("B");
g.addVertex("B1");
g.addVertex("B2");
g.addVertex("C");
g.addVertex("D");
g.addVertex("E");
g.addVertex("F");


g.addEdge("A", "B");
g.addEdge("A", "B1");
g.addEdge("A", "B2");
g.addEdge("A", "C");
g.addEdge("B", "D");
g.addEdge("C", "D");
g.addEdge("C", "E");
g.addEdge("E", "F");

console.log(g.toString());

var result = "";
g.bfs(g.vertex[0], function (v) {
    result+= v+ " "
});
console.log(result)

var result2 = "";
g.dfs(g.vertex[0], function (v) {
    result2+= v+ " "
});
console.log(result2)