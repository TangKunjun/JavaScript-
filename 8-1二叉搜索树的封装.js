/**
 * 二叉树包含的方法
 * insert 插入
 * search 查找
 * inOrderTraverse 通过中序遍历方式遍历所有节点
 * preOrderTraverse 通过先序遍历方式遍历所有节点
 * postOrderTraverse 通过先后序遍历方式遍历所有节点
 * min 返回树中最小的键/值
 * max 返回树中最大的键/值
 *remove 移除
 *
 * 由于没有封装value 所以就没有添加修改方法了
 */

function BinarySearchTree() {
    
    function Node(key) {
        this.key = key;
        // this.value = value  可以使用value来存值
        this.left = null;
        this.right = null;
    }
    
    // 属性
    this.root = null;


    // 方法

    /**
     * 插入
     * @param key
     */
    BinarySearchTree.prototype.insert = function (key) {
        // 根据key创建节点
        var newNode = new Node(key);

        if (!this.root) {
            this.root = newNode;
        } else {
            this.insertNode(this.root, newNode)
        }

    }


    /**
     * 递归 去寻找合适的位置插入节点
     * @param node 要比较的节点
     * @param newNode 要插入的新节点
     */
    BinarySearchTree.prototype.insertNode = function (node, newNode) {
        if(newNode.key < node.key) { // 往左边
            if (node.left) { // 左子节点有值
                this.insertNode(node.left, newNode);     // 继续递归
            } else {  // 左子节点没有值
                node.left = newNode
            }
        } else {  // 往右边
            if (node.right) { // 右节点有值
                this.insertNode(node.right, newNode);  // 继续递归
            } else{  // 右节点没有值
                node.right = newNode;
            }
        }
    }

    // 树的遍历
    /**
     * 先序遍历
     * 从根节点开始 先遍历左边树 再遍历右边
     * @param handler 处理函数
     */
    BinarySearchTree.prototype.preOrderTraversal = function (handler) {
        this.preOrderTraversalNode(this.root, handler);
    }

    /**
     * 对某个节点进行遍历
     * @param node 指定的节点
     * @param handler 处理函数
     */
    BinarySearchTree.prototype.preOrderTraversalNode = function (node, handler) {
        if (node) {
            // 处理经过的节点
            handler(node.key);

            // 处理经过的左子节点
            this.preOrderTraversalNode(node.left, handler);

            // 处理经过的右子节点
            this.preOrderTraversalNode(node.right, handler);
        }
    }


    /**
     * 中序遍历
     *  从左边树开始 到根节点 再遍历右边
     * @param handler 处理函数
     */
    BinarySearchTree.prototype.midOrderTraversal = function (handler) {
        this.midOrderTraversalNode(this.root, handler);
    }

    /**
     * 对某个节点进行中序遍历
     * @param node 指定的节点
     * @param handler 处理函数
     */
    BinarySearchTree.prototype.midOrderTraversalNode = function (node, handler) {
        if (node) {
            // 处理经过的左子节点
            this.midOrderTraversalNode(node.left, handler);

            // 处理经过的节点
            handler(node.key);

            // 处理经过的右子节点
            this.midOrderTraversalNode(node.right, handler);
        }
    }

    /**
     * 后序遍历
     *  从左边树开始 再遍历右边 最后根节点
     * @param handler 处理函数
     */
    BinarySearchTree.prototype.postOrderTraversal = function (handler) {
        this.postOrderTraversalNode(this.root, handler);
    }

    /**
     * 对某个节点进行中序遍历
     * @param node 指定的节点
     * @param handler 处理函数
     */
    BinarySearchTree.prototype.postOrderTraversalNode = function (node, handler) {
        if (node) {
            // 处理经过的左子节点
            this.postOrderTraversalNode(node.left, handler);


            // 处理经过的右子节点
            this.postOrderTraversalNode(node.right, handler);

            // 处理经过的节点
            handler(node.key);

        }
    }


    /**
     * 寻找最大值
     * 找到最右边的节点
     */
    BinarySearchTree.prototype.max = function () {
        var node = this.root;
        var key = null;
        while (node) {
            key = node.key;
            node = node.right;
        }
        return key;
    }

    /**
     * 寻找最小值
     * 找到最左边的节点
     */
    BinarySearchTree.prototype.min = function () {
        var node = this.root;
        var key = null;
        while (node) {
            key = node.key;
            node = node.left;
        }
        return key;
    }


    /**
     * 是否有指定的key
     * @param key
     */
    BinarySearchTree.prototype.search = function (key) {
        var node = this.root;

        while (node) {
            if (key < node.key) {
                node = node.left
            } else if (key > node.key) {
                node = node.right;
            } else {
                return true;
            }
        }
        return false
    }

    /**
     * 删除
     *  1.如果删除的节点是叶节点 直接删除即可(父节点的left或right指向null)
     *  2.如果删除的节点只有一个子节点 让父节点指向子节点
     *  3.如果删除的节点下有两个子节点
     * @param key
     */
    BinarySearchTree.prototype.remove = function (key) {
        var current = this.root;
        var parent = null;   // 父节点
        var isLeftChild = true;  // 是否父节点的左边

        // 寻找要删除的节点
        while (current.key !== key) {
            parent = current;
            if (key < current.key ) {
                isLeftChild = true;
                current = current.left;
            } else {
                isLeftChild = false;
                current = current.right;
            }

            // 没有找到节点的时候
            if (current === null) {
                return false;
            }
        }
        // 删除对应的节点
        // 1.删除的是叶子节点
        if (!current.left && !current.right) {
            if (current == this.root) {  // 如果删除的是根节点
                this.root = null;
            } else if (isLeftChild) {
                parent.left = null;
            } else {
                parent.right = null;
            }
        } else
        // 2.删除的节点只有一个子节点
        if (!current.right) { // 只有左子节点
            if (current === this.root) {  // 如果要删除的是根节点
                this.root = current.left
            } else  if (isLeftChild) { // 要删除的节点在父节点左边
                parent.left = current.left;
            } else {
                parent.right = current.left;
            }
        } else  if(!current.left) {
            if (current === this.root) {  // 如果要删除的是根节点
                this.root = current.right;
            } else  if (isLeftChild) {
                parent.left = current.right;
            } else {
                parent.right = current.right;
            }
        }
        // 3.删除的节点下面有两个节点，甚至还有孙节点
        // 需要在删除的节点下面找一个节点来替代当前的节点
        // 代替的节点值大小与要删除的节点值差不多大
        // 比目标节点小一点点叫前驱，比目标节点大一点点叫后继
        else {
            var succesor = this.getSuccesor(current);
            if (succesor === this.root) {
                this.root = succesor;
            } else if (isLeftChild) {
                parent.left = succesor;
            } else {
                parent.right = succesor;
            }
            succesor.left = current.left;
        }

    }

    /**
     * 找后继的方法
     * 比目标节点大一点点的节点就是目标节点右子节点的最左端
     * @param delNode 要删除的节点
     * @returns {*}
     */
    BinarySearchTree.prototype.getSuccesor = function (delNode) {
        // 定义变量
        var succesor = delNode;
        var current = delNode.right;
        var succesorParent = delNode;  // 后继的父节点
        // 循环查找
        while (!current) {
            succesorParent = succesor;
            succesor = current;
            current = current.left;
        }

        // 判断寻找的节点是否是目标节点的右子节点
        if (succesor !== current.right) {
            succesorParent.left = succesor.right;
            succesor.right = current.right;
        }

        return succesor;
    }
}


var bst = new BinarySearchTree();

// 插入数据
bst.insert(11);
bst.insert(7);
bst.insert(15);
bst.insert(5);
bst.insert(3);
bst.insert(9);
bst.insert(8);
bst.insert(10);
bst.insert(13);
bst.insert(12);
bst.insert(14);
bst.insert(20);
bst.insert(18);
bst.insert(25);


// 先序
var str = ""
bst.preOrderTraversal(function (key) {
    str += key + " "
})
console.log(str);

// 中序
var str2 = ""
bst.midOrderTraversal(function (key) {
    str2 += key + " "
})
console.log(str2)

// 后序
var str3 = ""
bst.postOrderTraversal(function (key) {
    str3 += key + " "
})
console.log(str3);


console.log(bst.max());
console.log(bst.min());

console.log(bst.search(20))
console.log(bst.search(21))

bst.remove(8);

var str4 = ""
bst.postOrderTraversal(function (key) {
    str4 += key + " "
})

console.log(str4);
