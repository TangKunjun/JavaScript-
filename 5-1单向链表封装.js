/**
 * 链表必须有一个head表示头部  之后所有的链表元素除了包含data之外 还需要包含next用于指向下一个链表元素
 **/

function LinkedList() {
    // 节点
    function Nodes(data) {
        this.data = data;
        this.next = null;
    }

    // 属性
    this.head = null;
    this.length = 0;

    /**
     * 追加元素的方法
     * @param data  追加的元素
     **/

    LinkedList.prototype.append = function (data) {
        var node = new Nodes(data);
        if (this.length === 0 ) {  // 追加第一个
           this.head = node;
        } else {   // 找到最后一个节点
            var lastNode = this.head;
            while (lastNode.next) {
                lastNode = lastNode.next;
            }
            lastNode.next = node;
        }
        this.length+=1;
    }


    /**
     * 字符串化
     */
    LinkedList.prototype.toString = function () {
        var node = this.head;
        var listString = "";
        while (node) {
            listString += node.data + "";
            node = node.next;
        }
        return listString;
    }


    /**
     * 插入指定位置
     * @param position 位置
     * @param data 数据
     */
    LinkedList.prototype.insert = function (position, data) {
        // 对position进行越界判断
        if (position < 0 || position > this.length) return false;

        // 创建链表元素
        var newNode = new Nodes(data);
        if (position === 0) {  // 如果插入的位置是第一个
            newNode.next = this.head;
            this.head = newNode;
        } else {
            var index = 0;
            var current = this.head;
            var previous = null;
            while (index++ < position) {
                previous = current;
                current = current.next;
            }
            newNode.next = current;
            previous.next = newNode;
        }
        this.length+=1;

        return true;
    }


    /**
     * 获取指定位置的元素
     * @param position 位置
     */
    LinkedList.prototype.get = function(position) {
        // 越界判断
        if (position < 0 || position >= this.length) return false;
        var target = this.head;
        var index = 0;
        while (index++ < position) {
            target = target.next;
        }
        return target.data;
    }

    /**
     * 获取指定元素的位置
     * @param element 指定元素
     */
    LinkedList.prototype.indexOf = function(element) {
        var target = this.head;
        var index = 0;
        while (target) {
            if (target.data === element) {
                return index
            }
            index+=1;
            target = target.next;
        }
        return -1;
    }

    /**
     * 更新指定位置的元素数据
     * @param position 位置
     * @param element 更新的值
     */
    LinkedList.prototype.update = function(position, element) {
        // 越界判断
        if (position < 0 || position >= this.length) return false;
        var target = this.head;
        var index = 0;
        while (index++ < position) {
            target = target.next;
        }
        target.data = element;
    }

    /**
     * 删除指定位置的元素
     * @param position 位置
     */
    LinkedList.prototype.removeAt = function(position) {
        // 越界判断
        if (position < 0 || position >= this.length) return null;

        var current = this.head;
        if (position === 0) {
            this.head = this.head.next;
        } else {
            var index = 0;
            var previous = null;
            while (index++ <position) {
                previous = current;
                current = current.next;
            }
            previous.next = current.next;
        }
        this.length-=1;
        return current.data;
    }

    /**
     * 删除指定的元素
     * @param data 要删除的元素
     */
    LinkedList.prototype.remove = function(data) {
        var position = this.indexOf(data); // 获取位置
        console.log(position)
        return this.removeAt(position);    // 指定位置删除元素
    }

    /**
     * 链表是否是空的
     */
    LinkedList.prototype.isEmpty = function() {
        return !this.length;
    }

    /**
     * 链表元素个数
     */
    LinkedList.prototype.size = function() {
        return this.length;
    }
}


var linked = new LinkedList();

linked.append("a");
linked.append("b");
linked.append("c");
// linked.insert(1, "1");
linked.insert(0, "2");

linked.update(2, " bbbbb ");

console.log(linked.toString());

console.log(linked.get(0));
console.log(linked.get(3));
console.log(linked.indexOf("d"))
linked.removeAt(0);
linked.remove(' bbbbb ');

console.log(linked.toString());
console.log(linked.isEmpty());
console.log(linked.size());