/**
 *  之前封装的哈希表数组量只有7 随着插入的数据越来越多 会导致桶里面数据越来越多
 *  导致效率变低
 *
 *  如何扩容：
 *  1. 简单的扩容可以扩容两倍 (新的容量值最好是质数，之后会优化成质数)
 *  2. 所有的数据都要重新插入
 *  扩容是很耗时的，但又是必须的
 *
 *  扩容的情况：
 *      当localFunction(填装因子) > 0.75的时候
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
        
        // 判断是否需要扩容
        if (this.count > this.limit * 0.75) {
            this.reSize(this.limit * 2);
        }
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
                    
                    // 判断是否要缩小容量
                    if (this.count > 7 && this.count < this.limit * 0.25) {
                        this.reSize(Math.floor(this.limit / 2));
                    }
                    
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

    /**
     * 扩容
     * @param newLimit 新数组容量
     */
    HashTable.prototype.reSize = function (newLimit) {
        // 赋值保存旧数据
        var oldStorage = this.storage;

        // 将所有属性初始化，limit赋新的值
        this.storage = [];
        this.count = 0;
        this.limit = newLimit;

        for (var i = 0;i<oldStorage.length; i++) {
            var bucket = this.storage[i];

            if (!bucket) {
                continue;
            }

            for (var j=0;j<bucket.length;j++) {
                var tupple = bucket[j];
                this.put(tupple[0], tupple[1]);
            }
        }
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

ht.reSize(10)

ht.remove("abc");

console.log(ht.get("abc"))
console.log(ht.get("cba"))
console.log(ht.get("ccc"))
console.log(ht.get("eee"))