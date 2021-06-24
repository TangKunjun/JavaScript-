/**
 * 封装集合
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



var set = new Set();
set.add(1);
set.add("a");
set.add({add: "添加"});
set.add([1,2,3,4]);
set.add(function () {
    return 123;
});

console.log(set.has(1));
console.log(set.size());
console.log(set.values());
set.remove("a");
console.log(set.values());
set.clear();
console.log(set.values())

