/**
 *  设计哈希函数
 *  1 将字符串转换成比较大的数值：hashcode
 *  2 将比较大的数值hashcode压缩到数组范围之内
 **/


/**
 * 哈希函数
 * @param str   要转换的字符串
 * @param size  数组的范围
 */
function hashFunc(str, size) {
    // 定义hashcode变量
    var hashCode = 0;

    // 霍纳法则，来计算hashCode的值
    // 用Unicode编码
    // 用质数37进行运算
    for (var i = 0; i < str.length; i++) {
        hashCode = 37 * hashCode + str.charCodeAt(i);
    }

    // 取余操作
    var index = hashCode % size;
    return index;
}


console.log(hashFunc("aaa", 7));
console.log(hashFunc("aab", 7));
console.log(hashFunc("baa", 7));
console.log(hashFunc("bcc", 7));
console.log(hashFunc("bdc", 7));
