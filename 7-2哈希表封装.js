/**
 *  哈希表的封装
 **/





/**
 *  哈希表
 *  最后哈希表的格式是 [[[kay,value],[key,value],[key,value]], [[key,value],[key,value],[key,[value]]]
 */
function HashTable() {
    // 属性
    this.storage = [];
    this.count = 0;    // 个数（用于计算填充因子，当大于0.75需要扩容，当小于0.25需要减少容量）
    this.limit = 7;    // 数组总长度（质数）


    /**
     * 哈希函数
     * @param str   要转换的字符串
     * @param size  数组的范围
     */
    HashTable.prototype.hashFunc = function(str, size) {
        // 定义hashcode变量
        var hashCode = 0;

        // 霍纳法则，来计算hashCode的值
        // 用Unicode编码
        // 用质数37进行运算
        for (var i = 0; i < str.length; i++) {
            hashCode = 37 * hashCode + str.charCodeAt(i);
        }

        // 取余操作
        return hashCode % size;
    }


    /**
     * 添加操作
     */
    HashTable.prototype.put = function (key, value) {
        // 1.根据key获取对应的index
        var index = this.hashFunc(key,  this.limit);

        // 2.根据index取出对应的桶（链地址法）
        var bucket = this.storage[index];

        // 3.判断这个桶里面是否为空
        if (!bucket) {
            bucket = [];
            this.storage[index] = bucket;
        }

        // 4.判断是否是修改数据
        for (var i =0;i<bucket.length;i++) {
            var tupple = bucket[i];
            if (tupple[0] === key) {
                tupple[1] = value;
                return;
            }
        }

        // 5.进行添加操作
        bucket.push([key,  value]);
        this.count+=1;
    }


    /**
     * 获取
     * @param key
     */
    HashTable.prototype.get = function (key) {
        // key转换成下标
        var index = this.hashFunc(key,  this.limit);
        // 获取桶
        var bucket = this.storage[index];

        if (bucket) {
            for (var i =0;i<bucket.length;i++) {
                var tupple = bucket[i];
                if (tupple[0] === key) {
                    return tupple[1];
                }
            }
            return null;
        } else {
            return null;
        }
    }


    /**
     * 删除操作
     * @param key
     */
    HashTable.prototype.remove = function (key) {
        // key转换成下标
        var index = this.hashFunc(key,  this.limit);
        // 获取桶
        var bucket = this.storage[index];

        if (bucket) {
            for (var i =0;i<bucket.length;i++) {
                var tupple = bucket[i];
                if (tupple[0] === key) {
                    bucket.splice(i,  1);
                    this.count-=1;
                    return tupple[1];
                }
            }
            return null;
        } else {
            return null;
        }
    }


    /**
     * 判断哈希表是否为空
     */
    HashTable.prototype.isEmpty = function () {
        return this.count === 0;
    }

    /**
     * 获取哈希表个数
     */
    HashTable.prototype.size = function () {
        return this.count;
    }
}



var ht = new HashTable();

ht.put("abc", 123);
ht.put("cba", 222);
ht.put("bbb", 333);
ht.put("ccc", 444);
ht.put("ddd", 555);
ht.put("eee", 666);
ht.put("fff", 777);

ht.remove("abc");

console.log(ht.get("abc"))
console.log(ht.get("cba"))
console.log(ht.get("ccc"))
console.log(ht.get("eee"))