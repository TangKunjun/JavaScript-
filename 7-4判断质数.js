function isZhi(num) {
    for (var i= 2;i<num;i++) {
        if (num % i === 0) {
            return true;
        }
    }
    return false;
}

/**
 *  上面这种方法效率太低了
 *
 *
 *  可以不必从2遍历到n-1
 *  一个数若是可以进行因数分解，那么分解时得到的两个数一定是一个小于等于sqrt(n),一个大于等于sqrt(n)
 *  比如16，因数分解等于2 * 8; sqrt(16) = 4;   2<4  8>4;而分解成4*4 那都等于sqrt(n)
 *  所以我们其实遍历到sqrt(n)就可以了
 **/

function isZhi2(num) {
    var temp = parseInt(Math.sqrt(num));
    for (var i= 2;i<=temp;i++) {
        if (num % i === 0) {
            return true;
        }
    }
    return false;
}


console.log(isZhi(3))
console.log(isZhi(4))
console.log(isZhi(5))

console.log("-----------")

console.log(isZhi2(3))
console.log(isZhi2(4))
console.log(isZhi2(5))