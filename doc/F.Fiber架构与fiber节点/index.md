## fiber node  

fiber node  :  对象

{
    return :  xxx 指向父节点 
    children:  xxx 指向第一个子节点
    sliping : xxx 指向兄弟节点
    type: xxx
    ....
}

### Fiber 背景
React15的渲染机制，根据行为上，我们将它宏观分成两个阶段:
协调阶段和渲染阶段； 
协调阶段： 
它使用 Virtual DOM跟diff算法来优化DOM的变更，这也意味着React在渲染出真实DOM的时候，所有的Virtual DOM树都在JS内存中,嗯…这也会在react15中一次渲染大量Dom会导致浏览器假死或者说是白屏的原因。

它并不是说，一次更新就执行一次刷新操作，
在协调阶段，它是把所有的差异对比，放到一个差异队列，再一次性去执行patch方法进行更新与渲染（时间长);
渲染阶段是不可中断的。这种时候一些优先级本应该很高的副作用比如执行动画一类的行为，这时候是添加到待处理队列的队尾，也就是说是被阻塞的。
（15 的 事件触发线程：当一个事件被触发时(鼠标点击，键盘敲击等)该线程会把事件添加到待处理队列的队尾，等待JS引擎的处理）
针对这些问题，react16中做了改动，也就是Fiber的实现。
React 重构了协调算法。
我们期望：把渲染更新过程拆分成多个子任务，每次只做一小部分，做完看是否还有剩余时间，如果有继续下一个任务；如果没有，挂起当前任务，将时间控制权交给主线程，等主线程不忙的时候再继续执行。

###  setstate 源码
function setState(state, callback) {
    let s = this.state;
    if (!this.prevState) this.prevState = extend({}, s);
    extend(s, typeof state==='function' ? state(s, this.props) : state);
    if (callback) this._renderCallbacks.push(callback);
    enqueueRender(this);
}
function enqueueRender(component) {
    if (!component._dirty && (component._dirty = true) && items.push(component)==1) {
        (options.debounceRendering || defer)(rerender); // 异步呀
    }
}
### 实现


简单来讲：Fiber的思想 任务分拣，时间分片，异步渲染，批量更新
把整个render拆分成多个单元任务，每一个fiber node就是最小的单元任务
基于设定好的优先级规则，利用requestIdleCallback 这个方法，来处理任务的调度
目前浏览器已经支持了这个api，当然React里也封装了这个方法，用来兼容不支持的浏览器。
window.requestIdleCallback()方法将在浏览器的空闲时段内调用的函数排队。这使开发人员能够在主事件循环上执行后台和低优先级工作，而不会影响延迟关键事件，如动画和输入响应。函数一般会按先进先调用的顺序执行，然而，如果回调函数指定了执行超时时间timeout，则有可能为了在超时前执行函数而打乱执行顺序。
参数： callback[, options]
返回值 ：一个无符号长整数，可以把它传入 Window.cancelIdleCallback() 方法，来结束回调
优先级规则：
synchronous 与之前的Stack reconciler操作一样，同步执行
task 在next tick之前执行
animation 下一帧之前执行
high 在不久的将来立即执行
low 稍微延迟（100-200ms）执行也没关系
offscreen 下一次render时或scroll时才执行