 /**
  * 对于给定的两个集合，返回一个包含两个集合中所有元素的新集合
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
  * 并集操作
  * @param others 其他集合
  */
 Set.prototype.union = function (others) {
     const newSet = new Set();
     const values = this.values();
     values.forEach(v => newSet.add(v));

     const values2 = others.values();
     values2.forEach(v => newSet.add(v));

     return newSet;
 };



 var set1 = new Set();
 set1.add("abc");
 set1.add("bcd");
 set1.add("dd");

 var set2 = new Set();
 set2.add("123");
 set2.add("abc");
 set2.add("dd");

 const newSet = set1.union(set2);

 console.log(newSet.values())