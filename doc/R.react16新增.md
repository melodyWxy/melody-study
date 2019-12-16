## react16新增


### 生命周期的更新 
  ComponentWillMount
  ComponentWillReciveProps
  ComponentWillUpdate
  getChildContext
  static getDerivedStateFromProps(props, state)
  组件每次被rerender的时候，包括在组件构建之后(虚拟dom之后，实际dom挂载之前)，每次获取新的props或state之后；每次接收新的props之后都会返回一个对象作为新的state，返回null则说明不需要更新state；配合componentDidUpdate，可以覆盖componentWillReceiveProps的所有用法
  getSnapshotBeforeUpdate(prevProps, prevState)
### api的更新
   createRef 
   createContext  对应 useContext 
   ReactDOM.createPortal 将子节点渲染到存在于父组件以外的 DOM 节点的优秀的方案
   Profiler 测量渲染一个 React 应用多久渲染一次以及渲染一次的“代价”。 它的目的是识别出应用中渲染较慢的部分，或是可以使用类似 memoization 优化的部分，并从相关优化中获益 react 16.5
id, // 发生提交的 Profiler 树的 “id”
phase, // "mount" （如果组件树刚加载） 或者 "update" （如果它重渲染了）之一
actualDuration, // 本次更新 committed 花费的渲染时间
baseDuration, // 估计不使用 memoization 的情况下渲染整颗子树需要的时间
startTime, // 本次更新中 React 开始渲染的时间
commitTime, // 本次更新中 React committed 的时间
interactions // 属于本次更新的 interactions 的集合
   React.Memo 
   useMemo
   各种钩子
   React.lazy  配合import()做动态加载的。    场景 根据业务逻辑  代码分割+动态载入  配合Suspense组件使用，fallback属性可以放loading组件等；
   useRef  传统的ref标记dom、标记组件获取他们的实例，现在useRef可以用来记录值，配合useCallback等钩子进行使用  
   componentDidCatch 以及 static getDerivedStateFromError ，错误边界，注意的是这里的错误边界无法捕捉到异步请求、延时器等异步错误。 这个跟react的合成事件有关系。=> error事件也是合成的。
   CONCURRENT 模式（实验阶段） 这个要牵扯到render机制；同步模式 
###  渲染机制的变动  =>fiber的实现


### React 是如何把对 Hook 的调用和组件联系起来的？
React 保持对当先渲染中的组件的追踪。多亏了 Hook 规范，我们得知 Hook 只会在 React 组件中被调用（或自定义 Hook —— 同样只会在 React 组件中被调用）。
： ： 
每个组件内部都有一个「记忆单元格」列表，它的表现为一个对象，用来存储一些数据。当你用 useState() 调用一个 Hook 的时候，它会读取当前的单元格（或在初始化render的时候吧这个单元格初始化），然后把指针移动到下一个。这就是多个 useState() 调用会得到各自独立的本地 state 的原因。



 

