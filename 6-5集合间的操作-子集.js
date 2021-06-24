/**
 * 验证一个集合是否是另一个集合的子集
 **/

function Set() {
    // 属性
    this.items = {};

    /**
     * 添加
     * @param value 添加的元素
     */
    Set.prototype.add = function (value) {
        if (this.has(value)) { // 如果已经有这个值了
            return false;
        }

        this.items[value] = value;
    };

    /**
     * 判断是否含有某元素
     * @param value 指定元素
     */
    Set.prototype.has = function (value) {
        return this.items.hasOwnProperty(value);
    };

    /**
     * 删除指定指定元素
     * @param value 指定元素
     */
    Set.prototype.remove = function (value) {
        if (!this.has(value)) { // 如果没有这个元素
            return false;
        }
        delete this.items[value];
        return true;
    }

    /**
     * 清空
     */
    Set.prototype.clear = function () {
        this.items = {};
    }

    /**
     * 获取集合个数
     */
    Set.prototype.size = function () {
        return Object.keys(this.items).length;
    }

    /**
     * 获取所有集合的元素
     */
    Set.prototype.values = function () {
        return Object.keys(this.items);
    }
}



/**
 * 判断是否为子集操作
 * @param others 其他集合
 */
Set.prototype.subSet = function (others) {
    const values = this.values();
    for (var i = 0; i<values.length;i++) {
        if (!others.has(values[i])) {
            return false
        }
    }

    return true;
};



var set1 = new Set();
set1.add("abc");
set1.add("bcd");
set1.add("dd");

var set2 = new Set();
set2.add("123");
set2.add("abc");
set2.add("dd");

const newSet = set1.subSet(set2);

console.log(newSet)

var set3 = new Set();
set3.add("abc");
set3.add("bcd");
set3.add("dd");
set3.add("123");

const newSet2 = set1.subSet(set3);

console.log(newSet2)