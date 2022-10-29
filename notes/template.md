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
区别：
    节流: n 秒内只运行一次，若在 n 秒内重复触发，只有一次生效
    防抖: n 秒后在执行该事件，若在 n 秒内被重复触发，则重新计时
场景：
    防抖
    短信验证码
    提交表单
    resize 事件

    节流
    scroll 事件，单位时间后计算一次滚动位置
    input 事件（上面提到过）
    播放事件，计算进度条
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

### vue 生命周期的理解
解：vue组件从创建到销毁的过程就是一个生命周期
Vue生命周期总共可以分为8个阶段：创建前后, 载入前后,更新前后,销毁前销毁后，以及一些特殊场景的生命周期

生命周期	       描述
beforeCreate	  执行时组件实例还未创建，通常用于插件开发中执行一些初始化任务
created	          组件初始化完毕，各种数据可以使用，常用于异步数据获取
beforeMount	      未执行渲染、更新，dom未创建
mounted	          初始化结束，dom已创建，可用于获取访问数据和dom元素
beforeUpdate	  更新前，可用于获取更新前各种状态
updated	          更新后，所有状态已是最新
beforeDestroy	  销毁前，可用于一些定时器或订阅的取消
destroyed	      组件已销毁，作用同上


## 首屏加载速度慢
可能原因：
    网络延时问题
    资源文件体积是否过大
    资源是否重复发送请求去加载了
    加载脚本的时候，渲染内容堵塞了
解决方案
    减小入口文件积
    静态资源本地缓存
    UI框架按需加载
    图片资源的压缩
    组件重复打包
    开启GZip压缩
    使用SSR

### vue数据双向绑定原理
vue数据双向绑定是通过数据劫持结合发布者-订阅者模式的方式来实现的

我们已经知道实现数据的双向绑定，首先要对数据进行劫持监听，所以我们需要设置一个监听器Observer，用来监听所有属性。如果属性发上变化了，就需要告诉订阅者Watcher看是否需要更新。

因为订阅者是有很多个，所以我们需要有一个消息订阅器Dep来专门收集这些订阅者，然后在监听器Observer和订阅者Watcher之间进行统一管理的。接着，我们还需要有一个指令解析器Compile，对每个节点元素进行扫描和解析，将相关指令（如v-model，v-on）对应初始化成一个订阅者Watcher，并替换模板数据或者绑定相应的函数，此时当订阅者Watcher接收到相应属性的变化，就会执行对应的更新函数，从而更新视图

### MVVM模式
MVVM模式就是Model–View–ViewModel模式。它实现了View的变动，自动反映在 ViewModel，反之亦然。对于双向绑定的理解，就是用户更新了View，Model的数据也自动被更新了，这种情况就是双向绑定。再说细点，就是在单向绑定的基础上给可输入元素input、textare等添加了change(input)事件,(change事件触发，View的状态就被更新了)来动态修改model

### nextTick的理解
是什么:
    在下次 DOM 更新循环结束之后执行延迟回调。在修改数据之后立即使用这个方法，获取更新后的 DOM
使用场景:
    如果想要在修改数据后立刻得到更新后的DOM结构，可以使用Vue.nextTick()
小结：
    把回调函数放入callbacks等待执行
    将执行函数放到微任务或者宏任务中
    事件循环到了微任务或者宏任务，执行函数依次执行callbacks中的回调

### slot 的理解
使用场景
    通过插槽可以让用户可以拓展组件，去更好地复用组件和对其做定制化处理
    如果父组件在使用到一个复用组件的时候，获取这个组件在不同的地方有少量的更改，如果去重写组件是一件不明智的事情
    通过slot插槽向组件内部指定位置传递内容，完成这个复用组件在不同场景的应用
    比如布局组件、表格列、下拉选、弹框显示内容等
分类
    默认插槽
    具名插槽
    作用域插槽

### vue key 的原理,理解
作用:
    key是给每一个vnode的唯一id，也是diff的一种优化策略，可以根据key，更准确， 更快的找到对应的vnode节点
场景背后的逻辑:
    当我们在使用v-for时，需要给单元加上key
    如果不用key，Vue会采用就地复地原则：最小化element的移动，并且会尝试尽最大程度在同适当的地方对相同类型的element，做patch或者reuse。
    如果使用了key，Vue会根据keys的顺序记录element，曾经拥有了key的element如果不再出现的话，会被直接remove或者destoryed
    用+new Date()生成的时间戳作为key，手动强制触发重新渲染
    当拥有新值的rerender作为key时，拥有了新key的Comp出现了，那么旧key Comp会被移除，新key Comp触发渲染

### keep-alive理解
Keep-alive 是什么:
    keep-alive是vue中的内置组件，能在组件切换过程中将状态保留在内存中，防止重复渲染DOM
    keep-alive 包裹动态组件时，会缓存不活动的组件实例，而不是销毁它们
keep-alive可以设置以下props属性：
    include - 字符串或正则表达式。只有名称匹配的组件会被缓存
    exclude - 字符串或正则表达式。任何名称匹配的组件都不会被缓存
    max - 数字。最多可以缓存多少组件实例
