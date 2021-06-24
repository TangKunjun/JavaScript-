/**
 * 与单向链表相比 双向链表 多了一个tail指向最后一个链表元素 元素中多了一个prev属性指向上一个元素
 **/

function DoublyLinkedList() {
    // 节点
    function Nodes(data) {
        this.data = data;
        this.next = null;
        this.prev = null;
    }

    // 属性
    this.head = null;
    this.tail = null;
    this.length = 0;


    /**
     * 追加元素的方法
     * @param data  追加的元素
     **/

    DoublyLinkedList.prototype.append = function (data) {
        var node = new Nodes(data);
        if (this.length === 0 ) {  // 追加第一个
           this.head = node;
           this.tail = node;
        } else {   // 找到最后一个节点
            var lastNode = this.head;
            while (lastNode.next) {
                lastNode = lastNode.next;
            }
            lastNode.next = node;
            node.prev = lastNode;
            this.tail = node;
        }
        this.length+=1;
    }


    /**
     * 字符串化
     */
    DoublyLinkedList.prototype.toString = function () {
        var node = this.head;
        var listString = "";
        while (node) {
            listString += node.data + "";
            node = node.next;
        }
        return listString;
    }

    /**
     * 字符串化(向后顺序)
     */
    DoublyLinkedList.prototype.backwardToString = function () {
        return this.toString();
    };

    /**
     * 字符串化(向前顺序)
     */
    DoublyLinkedList.prototype.forwardToString = function () {
        var node = this.tail;
        var listString = "";
        while (node) {
            listString += node.data + "";
            node = node.prev;
        }
        return listString;
    }

    /**
     * 插入指定位置
     * @param position 位置
     * @param data 数据
     */
    DoublyLinkedList.prototype.insert = function (position, data) {
        // 对position进行越界判断
        if (position < 0 || position >= this.length) return false;

        // 创建链表元素
        var newNode = new Nodes(data);
        if (this.length === 0) {  // 如果是第一个并且当前链表无数据时
            this.head = newNode;
            this.tail = newNode;
        } else {  // 有数据时
            if (position === 0) { // 插入到第一条
                newNode.next = this.head;
                this.head = newNode;
            } else if (position === this.length-1) {
                this.tail.next = newNode;
                newNode.prev = this.tail;
                this.tail = newNode;
            } else {
                var index = 0;
                var current = this.head;
                var previous = null;
                while (index++ < position) {
                    previous = current;
                    current = current.next;
                }
                newNode.next = current;
                newNode.prev = previous;
                previous.next = newNode;
            }
        }
        this.length+=1;
        return true;
    }


    /**
     * 获取指定位置的元素
     * @param position 位置
     */
    DoublyLinkedList.prototype.get = function(position) {
        // 越界判断
        if (position < 0 || position >= this.length) return false;

        var target = null;
        var index = 0;
        if (this.length/2 > position) { // 从前往后遍历
            target = this.head;
            while (index++ < position) {
                target = target.next;
            }
            return target.data;
        } else {
            target = this.tail;
            index = this.length -1;
            while (index-- < position) {
                target = target.prev;
            }
        }
        return target.data;


    }

    /**
     * 获取指定元素的位置
     * @param element 指定元素
     */
    DoublyLinkedList.prototype.indexOf = function(element) {
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
    DoublyLinkedList.prototype.update = function(position, element) {
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
    DoublyLinkedList.prototype.removeAt = function(position) {
        // 越界判断
        if (position < 0 || position >= this.length) return null;

        var current = this.head;
        if (this.length === 1) {
            this.head = null;
            this.tail = null;
        } else {
            if (position === 0) {
                this.head = this.head.next;
                this.head.prev = null;
            } else if(position === this.length -1) {
                current = this.tail;
                current.prev.next = null;
            } else {
                var index = 0;
                var previous = null;
                while (index++ <position) {
                    previous = current;
                    current = current.next;
                }
                previous.next = current.next;
                current.next.prev = previous;
            }
        }

        this.length-=1;
        return current.data;
    }

    /**
     * 删除指定的元素
     * @param data 要删除的元素
     */
    DoublyLinkedList.prototype.remove = function(data) {
        var position = this.indexOf(data); // 获取位置
        return this.removeAt(position);    // 指定位置删除元素
    }

    /**
     * 链表是否是空的
     */
    DoublyLinkedList.prototype.isEmpty = function() {
        return !this.length;
    }

    /**
     * 链表元素个数
     */
    DoublyLinkedList.prototype.size = function() {
        return this.length;
    }
}


var doublylinked = new DoublyLinkedList();

doublylinked.append("a");
doublylinked.append("b");
doublylinked.append("c");
doublylinked.append("E");

doublylinked.insert(0, "1");
doublylinked.insert(4, "5");
doublylinked.insert(3, "3");

doublylinked.update(1, "A")

console.log(doublylinked.toString());
console.log(doublylinked.forwardToString());
console.log(doublylinked.backwardToString());

console.log(doublylinked.get(2))
console.log(doublylinked.get(6))

console.log(doublylinked.indexOf("b"))

doublylinked.removeAt(0);
doublylinked.removeAt(3);
doublylinked.removeAt(4);
doublylinked.remove("b");

console.log(doublylinked.toString());
console.log(doublylinked.isEmpty());
console.log(doublylinked.size())

