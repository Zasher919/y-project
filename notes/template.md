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
