### 1.函数柯里化

```bash
描述:接收多个参数的函数变换成接收单一参数的函数，嵌套返回直到所有参数都被使用并返回最终结果。

简：函数柯里化是一个函数变换的过程，是将函数从调用方式：f(a,b,c),转成成:f(a)(b)(c)

注意：柯里化不会调用函数，它只是对函数进行转换

```

### 2.this 关键字指向问题

```bash
1.全局环境指向全局对象  2.全局函数中的this，指向全局对象

3.内部函数的this，指向全局对象  4.方法中的this，指向调用方法的对象

5.事件中的this，指向触发事件的DOM对象  6.构造函数中的this，指向new 创建的实例对象

7.箭头函数的this，指向定义函数的上下文

```

### set, map 数据结构和区别

```bash
set:
    ES6提供了新的数据结构,类似于数组,但成员是唯一的,
    Set本身是一个构造函数需要new, 用来生成set数据结构
    set对象允许存储任何类型的唯一值,
    提供操作api: 1.add 添加 2.delete 删除 3.has 判断 4.clear 清楚
    set遍历: 1.keys 遍历建 2.values 值 3.entries 建,值,需接受 4.foreach
    总结:1.类似数组,值不重复 2.可存贮任何类型 3.值不会进行类型转换 4.NaN值是重复的 5.undefined 被存储

map:
    map数据结构用来保存任何类型的键值对
    需要new map生成map数据结构
    操作api: 1.get 2.set 3.has 4.delete 5.clear
    遍历方法: 1.keys 2.values 3.entries 4.foreach
    总结: 1.支持所有数据类型为键 2.本质上是键值对的集合,类型集合 3.二个NaN也是重复的 4.NaN和undefined都可以被存

map和object的区别:
    1.object的key必须是简单数据类型(整数,字符串,symbol), map的key可以是任何类型
    2.map元素插入顺序是FIFO, object 没有
    3.map继承object
    4.map在存储大量元素的时候性能表现更好
    5.写入删除密集的情况下应该使用map

map和set的区别:
    1.set以[val,val]形式存储元素, map以[key,value]形式存储
    2.map的值不作为键, 键和值是分开的
扩展:
    什么是FIFO？
　　FIFO是英文First In First Out 的缩写，是一种先进先出的数据缓存器，他与普通存储器的区别是没有外部读写地址线，这样使用起来非常简单，但缺点就是只能顺序写入数据，顺序的读出数据，其数据地址由内部读写指针自动加1完成，不能像普通存储器那样可以由地址线决定读取或写入某个指定的地址

```

### 3.节流与防抖

```bash
1.应用场景：防抖应用输入框输入，表单验证等  节流应用滚动加载，高频点击等

2.代码实现

    2.1：节流
        function throttle(fn,time){
            let timeout
            return function(){
                let _this = this
                let args = arguments
                if(!timeout){
                    clearTimeout(timeout)
                }

                timeout = setTimeout(function(){
                        timeout = null
                        fn.apply(_this.args)
                    },time)
            }
        }

    2.2：防抖
        function debounce(fn,time){
            let timeout
            return function(){
                let _this = this,args = arguments
                if(timeout){
                    clearTimeout(timeout)
                }

                timeout = setTimeout(function(){
                    fn.apply(_this,args)
                },time)
            }
        }

```

### VUE

### 1.MVVM 模式

```bash
描述：MVVM是Model-View-ViewModel的简写，M表示模型层(存储数据)，V表示视图层(显示数据)

    VM表示视图模型控制层,即数据变化后，视图相应变化

原理：遍历data里面的数据，通过Object.defineProperty把这些数据附上getter/setter方法，并监听起来，

    然后当数据和视图变化的时候，对应组件的数据和视图就会为止变化

实现好处：实际开发过程中，只需要关注model层，即面向数据开发，极大的减少DOM操作的开发，减少代码量

```

### 2.VUE 如何渲染页面, 渲染过程, 以及简单原理

```base
    其主要逻辑为当VNode为真实元素或旧的VNode 和行的 VNode完全相同时, 直接调用createElm方法生成真实的DOM树, 当VNode新旧存在差异时, 则调用patchVnode 方法, 通过比较新旧VNode节点, 根据不同的状态对DOM做合理的添加, 删除, 修改DOM, 再调用createElm生成真实的DOM树

    渲染小结: 关键流程
    1. new Vue, 执行初始化
    2.挂载$mount 方法, 通过自定义Render 方法, template, el 等生产Render函数
    3.通过Watcher监听数据的变化
    4.当数据发生变化时, Render函数执行生成VNode对象
    5.通过patch 方法, 对比新旧VNode对象, 然后通过DOM Diff算法, 添加, 修改, 删除真正的DOM元素

```

### js JSON.parse(JSON.stringify(obj))实现深拷贝的弊端以及解决方法

```base
   弊端:
        1.如果源数据里面, 存在时间对象, 克隆之后时间对象会变成字符串
        2.如果源数据存在正则, 错误对象, 则序列化的结果将只得到空对象
        3.如果源数据里面有函数, undefined , 克制之后, 函数, undefined会丢失
        4. JSON.stringfy() 只能序列化对象的可枚举的自有属性
   解决: 可用lodash 库的 cloneDeep 来解决, 也可自己封装工具函数解决

```
