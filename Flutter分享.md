#Flutter 快速上车指南

### Flutter 是什么？

​		谷歌的移动UI框架，可以快速在iOS和Android上构建高质量的**原生用户**界面。 Flutter可以与现有的代码一起工作。在全世界，Flutter正在被越来越多的开发者和组织使用，并且Flutter是完全免费、开源的。简单来说，Flutter是一款移动应用程序SDK，包含框架、控件和一些工具，可以用一套代码同时构建Android和iOS应用，并且性能可以达到原生应用一样的性能。

### Flutter 的优点

1. **美观**

   ​		Flutter 在构建应用时可以像 css 一样对 UI 实现像素级的控制，这也意味着原本的设计意图可以被完美地执行出来，从而将品牌个性忠实地传达给用户。 

2. **快速**
  
   ​		Flutter 的 UI 渲染性能很好。在生产环境下，Flutter 将代码编译成机器码执行，并充分利用 GPU 的图形加速能力，因此使用 Flutter 开发的移动应用即使在低配手机上也能实现每秒 60 帧的 UI 渲染速度。

> Flutter 同时做到 “美观” 和 “快速” 的原因，在于其架构本身。Flutter 引擎使用 C++ 编写，包括高效的 Skia 2D 渲染引擎，Dart 运行时和文本渲染库。这个引擎使得 Flutter 框架可以自由、灵活、高效地绘制 UI 组件。而应用开发者则可以用 Flutter 框架来轻松实现各种设计语言和动画效果。

3. **高效**

   ​		对开发者来说，使用 Flutter 开发应用十分高效。Flutter 广受好评的 Hot Reload (热重载) 功能可以在 1 秒内实现代码到 UI 的更新，使得开发操作周期被大幅缩短。另外，热重载能够在执行的时候保留应用的当前状态 (即 Stateful)，比如，你可能在修改一个导航结构里的子页面，保留状态的热重载可以让你不需要重新从起始页一路点击回到这个子页面，而是在代码修改完成后即刻看到结果。

4. **开放**

   ​		Flutter 是开放的，它是一个完全开源的项目。全球的开发者都可以免费使用和拓展 Flutter 的源代码，并为 Flutter 的生态和文档作贡献。 现在已经有许多中国开发者活跃在社区中，并为 Flutter 做出了坚实的贡献。

###  Flutter 和 React-Native、Weex 这样的动态化框架有什么异同之处？

####不同之处：

+ React-Native、Weex核心是通过Javascript开发，执行时需要Javascript解释器，UI是通过原生控件渲染。Flutter与用于构建移动应用程序的其它大多数框架不同，因为Flutter既不使用WebView，也不使用操作系统的原生控件。 相反，Flutter使用自己的高性能渲染引擎来绘制widget。Flutter使用C、C ++、Dart和Skia（2D渲染引擎）构建。在IOS上，Flutter引擎的C/C ++代码使用LLVM编译，而在Android下，Flutter引擎的C/C ++代码是用Android的NDK编译的，任何Dart代码都是AOT编译成本地代码的，Flutter应用程序依然使用本机指令集运行（不涉及解释器）。因此，Flutter能达到原生应用一样的性能。

  > **总结起来其实就是：**
  >
  > React Native是利用 JS 来调用 Native 端的组件，从而实现相应的功能。
  >
  > Flutter提供了一组自己的widget而不使用Native端的组件，并且使用本机指令集运行，不需要通过解释器，这也就保证了它的性能。

+ 以往最早的Hybrid开发，主要依赖于WebView。但是WebView是一个很重的控件，很容易产生内存问题，而且复杂的UI在WebView上显示的性能不好。react-native技术抛开了WebView，利用JavaScriptCore来做桥接，将js调用转为native调用，只牺牲了小部分性能获取的跨平台开发，这是一大进步。所以现在react-native很流行的原因。

  ![react-native原理图](https://cdn.weipaitang.com/static/201911269081ff76-3ad7-ff763ad7-aca1-8adaf76fd2d2-W630H301)

+ Flutter实现跨平台采用了更为彻底的方案。它既没有采用WebView也没有采用JavaScriptCore，而是自己实现了一台UI框架，然后直接系统更底层渲染系统上画UI。所以它采用的开发语言不是JS，而是Dart。Dart语言可以编译成原生代码，直接跟原生通信。

  ![Flutter原理图](https://cdn.weipaitang.com/static/20191126d4388e17-2f16-8e172f16-60a1-5d7a88ad3605-W628H304)

> **Flutter** 中只需平台提供一个 `Surface` 和一个 `Canvas` ，剩下的 **Flutter** 说：*“你可以躺下了，我们来自己动”。*

![Flutter Architecture Diagram](https://cdn.weipaitang.com/static/public/201911261574759342740-e3e10e1caf725d776d4f436962150b30.svg)

​		**Flutter** 中绝大部分的 `Widget` 都与平台无关， 开发者基于 `Framework` 开发 App ，而 `Framework` 运行在 `Engine` 之上，由 `Engine` 进行适配和跨平台支持。这个跨平台的支持过程，其实就是将 **Flutter UI 中的 `Widget` “数据化” ，然后通过 `Engine` 上的 `Skia` 直接绘制到屏幕上 。**

#### 相同之处：

+ React 的虚拟 *DOM* 的概念相信大家都知道，这是 React 的性能保证之一，而 Flutter 其实也存在类似的虚拟 *DOM* 概念。

  Flutter 中我们写的 `Widget` ， 其实并非真正的渲染控件，这一点和 React Native 中的标签类似，`Widget` 更像配置文件， 由它组成的 `Widget` 树并非真正的渲染树。

  `Widget` 在渲染时会经过 `Element` 变化， 最后转化为 `RenderObject` 再进行绘制， 而最终组成的 `RenderObject` 树才是 “真正的渲染 Dom” ， 每次 `Widget` 树触发的改变，并不一定会导致`RenderObject` 树的完全更新。

+  Flutter 在很多方面都借鉴了 React Native ，所以在状态管理方面也极具“即视感”，比如都是调用 `setState` 的方式去更新，同时操作都不是立即生效的。

> 奉上性能对比
>
> https://www.yuque.com/xytech/flutter/gs3pnk
>
> RN 新一代 JS 引擎 Hermes
>
> https://zhuanlan.zhihu.com/p/83164553

### Dart 语言基础

#### Dart 简介

​		Dart 其实是一门在2011 年就诞生的语言。当时谷歌的工程师出于对JavaScript的不满，就造出了这么个轮子，诞生的初期也赢得了部分前端开发者的青睐。但是这时JavaScript借着NodeJS火了起来，在前端、后端、移动端无孔不入，Dart就渐渐被人遗忘了，可见Dart本身是具有很强的实力的。直到2017年才因为 flutter 而重新受到关注。

#### Dart 特性

+  Dart 必须要一个顶级函数 main() 当作入口来运行。
+  Dart 是一门面向对象的强类型语言。在Dart中，一切都是对象，每个对象都是一个类的实例，所有对象都继承自Object。
+  Dart支持泛型类型，如List<int>（整数列表）或List<dynamic>（任何类型的对象列表）。
+  Dart不具备关键字public、protected、private。如果一个标识符以下划线_开始，那么它和它的库都是私有的。
+ 通常为单线程异步，但是可以利用 Isolate（隔离区）实现多线程。 
+  在语法上，Dart 提供了很多便捷的操作，可以明显减少代码量。比如字符连接，可以直接 "my name is \$name, age is $age"，无需+号拼接，也无需做类型转换。
+ 支持 JIT（ Just In Time ）和 AOT（ Ahead Of Time ），支持开发时的快速迭代和正式发布后最大程度发挥硬件性能。 

#### Dart 基本使用

+ 变量声明
+ 函数声明
+ 操作符
+ 异步支持
+ mixins 类似于接口，又比接口更强大（可以定义实现方法，并可选择调用）

####  为什么 Flutter 选择 Dart 语言？

+ 支持 JIT（ Just In Time ）和 AOT（ Ahead Of Time ），支持开发时的快速迭代和正式发布后最大程度发挥硬件性能。 JIT 保证了开发效率，提供了有状态的热重载，而 AOT 保证了用户体验，可以快速启动并拥有可预测性的生产部署性能。
+ Dart 可以更轻松地创建以 60fps 运行的流畅动画和转场。Dart 可以在没有锁的情况下进行对象分配和垃圾回收。就像 JavaScript 一样，Dart 避免了抢占式调度和共享内存（因而也不需要锁）。由于 Flutter 应用程序被编译为本地代码，因此它们不需要在领域之间建立缓慢的桥梁（例如，JavaScript 到本地代码）。它的启动速度也快得多。
+ Dart 使 Flutter 不需要单独的声明式布局语言，如 JSX 或 XML，或单独的可视化界面构建器，因为 Dart 的声明式编程布局易于阅读和可视化。所有的布局使用一种语言，聚集在一处，Flutter 很容易提供高级工具，使布局更简单。
+ 开发人员发现 Dart 特别容易学习，因为它具有静态和动态语言用户都熟悉的特性。

### Flutter 基础

+ 开发体验（热重载）
  
  ​		支持Hot Reload，通过将更新的源代码文件注入正在运行的Dart VM（虚拟机）中工作。这不仅包括添加新类，还包括向现有类添加方法和字段，以及更改现有函数。
  
+ Widget 布局 

  ​		嵌套使用，每一个 Widget 都有自己的属性。（需要了解这个控件的用途）

+ 组件的写法 

  ​		分为有状态组件和无状态组件，每个组件都必须返回一个Widget。

+ 生命周期 

  ![img](https://img2018.cnblogs.com/blog/1115039/201907/1115039-20190712152636551-2080302016.jpg)

  + **createState ** 只执行一次，创建StatefulWidget
  + **initState** 只执行一次，这时 StatefulWidget 已经被加载到渲染树里，可以在此做一些初始化的操作。
  + **didChangeDependencies** 当 StatefulWidget 第一次创建的时候，didChangeDependencies 方法会在 initState 方法之后立即调用。之后只会在你的 StatefulWidget 依赖的 InheritedWidget 发生变化后才会调用。所以 didChangeDependencies 有可能会被调用多次。
  + **build** 当 StatefulWidget 第一次创建的时候，build方法会在 didChangeDependencies 后立即调用。之后会在 setState被调用后再次执行，所以 build 可能会被多次调用。（不要在build中做出了创建 Widget之外的操作）
  + **addPostFrameCallback** 是 StatefulWidget 渲染结束的回调，只会被调用一次，之后 StatefulWidget 需要刷新 UI 也不会被调用。
  + **didUpdateWidget** 当引起父组件 rebuild 才会被调用，所以可能会被调用多次，这个函数一般用于比较新、老Widget，看看哪些属性改变了，并对State做一些调整。需要注意的是，涉及到controller的变更，需要在这个函数中移除老的controller的监听，并创建新controller的监听。
  + **deactivate **当 StatefulWidget 被暂时从视图树中移除时，会调用这个方法，同时页面切换时，也会调用。deactivate 总是在 dispose 之前执行
  + **dispose** StatefulWidget 销毁时执行，通常用来移除监听，清理环境。

+ 事件处理 

  + 自带交互的控件，如RaisedButton、IconButton、OutlineButton、Checkbox、SnackBar、Switch等
  + 不自带交互的控件，使用 **GestureDetector**

+ 网络请求 

  ​		推荐使用第三方库Dio，Dio是一个强大易用的dart http请求库，支持Restful API、FormData、拦截器、请求取消、Cookie管理、文件上传/下载等。

+ 数据共享 

  ​		一般的方式就是使用 InheritedWidget，当InheritedWidget发生变化时，它的子树中所有依赖了它的数据的Widget都会进行rebuild，这使得开发者省去了维护数据同步逻辑的麻烦。

### Flutter 近期进展

+ Flutter for Web

  ![Flutter for Web](https://cdn.weipaitang.com/static/20191128f1c67530-9aba-75309aba-3fcd-1977c91fbf7c-W585H449)

  ​		Flutter for Web 保留了 Flutter 框架的代码来最大化复用移动端和 Web 端的代码。但是为了能在浏览器里面运行 Flutter 程序，Web 端的 Flutter SDK 用 Flutter Web engine 代替了移动端的 C++ Flutter engine。这个 Flutter Web engine 提供了一个 dart:ui 库在 Web 平台上的实现，它做的事和移动端 dart:ui 很相似——把 Flutter 上层框架产生的图片对象 “画” 到网页上。

  ​		Flutter for Web 在 Widget 这一层和移动端保持高度一致，所以代码的复用能力很好。图像渲染的结果也达到了高度一致。在开发调试的时候可以用 Dart DevTools 并且支持 Hot Reload。虽然在开发体验上还有很多的工作要完成，但目前已经处在一个基本可用的状态。

  ​		总的来说，Flutter for Web 目前处在技术预览阶段，**不建议在生产环境中使用**。当前在 Web 端主要的研发工作如下: 

  - 合并代码到 Flutter SDK
  - 保证所有 widgets 都能正确渲染
  - 优化性能
  - 完善对浏览器无障碍功能的支持
  - 添加插件系统来使用现有的 JS 库
  - 加强开发调试工具的可用性

+ 最新的状态管理方案—— provider

+ Dart 2.3 的改进对 Flutter 的影响

  ​		在 Dart 2.3中，增加了 Control Flow Elements in Collections，可以在集合数据类型的定义中使用 if 和 for 这样的流程控制元素。另外还增加了对 spread operator 的支持。

  ![before](https://cdn.weipaitang.com/static/20191128826e3c99-ebe9-3c99ebe9-1fae-202cab01bdf7-W1000H517)

  ![after](https://cdn.weipaitang.com/static/20191128797736b6-aeff-36b6aeff-461e-1ac4eae6d5b1-W1002H338)

### 未来展望

https://github.com/flutter/flutter/wiki/Roadmap