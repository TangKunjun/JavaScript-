function ArrayList() {
    // 属性
    this.array = [];

    // 方法
    /**
     * 插入
     * @param item
     */
    ArrayList.prototype.insert = function (item) {
        this.array.push(item)
    }

    /**
     * toString
     */
    ArrayList.prototype.toString = function () {
        return this.array.join(" - ");
    }

    /**
     * 交换位置
     * @param n 交换目标的下标
     * @param m 交换目标的下标
     */
    ArrayList.prototype.swap = function(n, m) {
        var temp = this.array[n];
        this.array[n] = this.array[m];
        this.array[m] = temp;
    }

    /**
     * 冒泡排序
     * 两两进行比较，大的数往右挪
     * 比较效率 O(n²)
     * 交换效率 O(n²)
     */
    ArrayList.prototype.bubbleSort = function () {
        // j要从数组的总数-1开始，因为i是和i+1比较的，所以i不能等于数组的总数
        for (var j= this.array.length - 1;j>=0 ; j--) {
            for (var i=0;i<j;i++) {
                if (this.array[i] > this.array[i+1]) {
                    this.swap(i, i+1)
                }
            }
        }
        return this.toString();
    }

    /**
     * 选择排序
     * 找到最小值的下标进行排序
     * 比较效率 O(n²)
     * 交换效率 O(n)
     */
    ArrayList.prototype.selectionSort = function () {
        var min = 0;  // 设置最小值的下标是0
        for (var j=0; j<this.array.length-1; j++) {  // 第一层循环用于依次把最小值插入最左边，不用全部遍历 总数-1即可
            min = j;  // 每一次把最左边的值当成最小值
            for (var i = min+1; i < this.array.length; i++) {
                if (this.array[min] > this.array[i]) { // 如果最小值下标大于当前遍历的值 就把当前下标赋值给min
                    min = i;
                }
            }
            this.swap(min, j);  // 最小的值放到左边
        }
        return this.toString();
    }


    /**
     * 插入排序
     * 从第2个元素开始遍历，依次插入到左边合适的位置，让左边变成排列好的数组
     * 大O表示法与选择排序一样 但是插入排序的效率是简单排序中最高的 但是复制次数是最多的（复制不消耗性能）
     */
    ArrayList.prototype.insertSort = function () {

        for (var i=1;i<this.array.length;i++) {
            var j = i;
            var temp = this.array[i];
            while (this.array[j-1] > temp && j>=0) {  // 如果j-1大于插入的元素 那就依次往右推
                this.array[j] = this.array[j-1];
                j--;
            }
            this.array[j] = temp;   // 直到出现一个不大于插入的元素，在当前位置插入
        }
        return this.toString();
    }


    /**
     * 希尔排序
     * 由于插入排序，如果要插入的值很小，左边排好序的元素需要依次往右移一位，很影响性能
     * 希尔排序通过间隔进行分组，再排序，间隔一直递减直到1
     * 希尔排序大多数情况下高于简单排序，在某些合适情况下甚至高于快速排序
     */
    ArrayList.prototype.shellSort = function () {
        // 初始化增量(间隔)
        var grap = Math.floor(this.array.length / 2);
        // while循环不断减少
        while(grap >= 1) {
            // 以grap作为间隔进行分组，进行排序
            for (var i = grap;i<this.array.length;i++) {
                var temp = this.array[i];
                var j = i;
                while (this.array[j - grap] > temp && j>grap-1) {
                    this.array[j] = this.array[j-grap];
                    j-=grap;
                }
                //将j的位置赋值给temp
                this.array[j] = temp;
            }
            // 增量变化
            grap = Math.floor(grap / 2);
        }
        return this.toString();
    }

    /**
     * 快速排序
     * 快速排序是通过选择一个元素作为枢纽，比枢纽大的元素放到右边，比枢纽小的元素放到左边，对左右两边递归
     */
    /**
     * 选择枢纽
     * 一般选择左边的下标和中间以及右边下标中的中间值作为枢纽
     * 同时再给这三个数进行排序
     * @param left 最左边位置
     * @param right 最右边的位置
     */
    ArrayList.prototype.median = function (left, right) {
        // 选出中间位置
        var center = Math.floor((left + right) / 2);
        // 判断大小进行排序
        if (this.array[left] > this.array[center]) {
            this.swap(left, center)
        }
        if (this.array[left] > this.array[right]) {
            this.swap(left, right)
        }
        if (this.array[center] > this.array[right]) {
            this.swap(center, right)
        }

        // 将枢纽放在length -1的位置
        this.swap(center, right-1);

        return this.array[right-1];

    }

    ArrayList.prototype.quickSort = function () {
        this.quick(0, this.array.length-1);

        return this.toString();
    }
    /**
     * 快速排序的递归
     */
    ArrayList.prototype.quick = function (left, right) {
        // 结束添加
        if (left >=right) return;
        // 获取枢纽
        var pivot = this.median(left, right);

        // 定义变量，用于记录当前找到的位置
        var i = left;  //  表示比枢纽小的元素
        var j = right-1; // 表示比枢纽大的元素

        // 进行交互循环
        while (true) {
            while (this.array[++i] < pivot){}  // 这个循环其实就是判断 i往右边依次查找时，出现了枢纽大的数就暂停，保留这个位置
            while (this.array[--j] > pivot) {} // 这个循环其实就是判断 j往左边依次查找时，出现了枢纽小的数就暂停，保留这个位置
            if (i<j) {  // 两个都暂停的数进行交换
                this.swap(i, j);
            } else {   // 如果相等或者i>j就说明已经变量完了。需要跳出
                break;
            }
        }
        // 将枢纽放在正确的位置
        this.swap(i, right - 1);

        // 分而治之
        this.quick(left, i - 1);
        this.quick(i + 1, right);
    }


}


var arry = new ArrayList();
arry.insert(123);
arry.insert(33);
arry.insert(234);
arry.insert(23);
arry.insert(53);
arry.insert(54);
arry.insert(33);

console.log(arry.toString());

// console.log(arry.bubbleSort());

// console.log(arry.selectionSort());

// console.log(arry.insertSort());

// console.log(arry.shellSort());

console.log(arry.quickSort());