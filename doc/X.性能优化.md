## 性能优化 
两个宏观角度： 资源的请求(网络层面)，资源的执行(代码层面)； 
###  资源的请求(资源的载入)
    1  缓存。 利用强缓存(cache contruler  200)和协商缓存(304 etag:长度+时间戳)的机制; 
    2  cdn。  cdn 算法 =>  1 iphash:分析客户端ip 2 url分发 3round robin 加权算法 、轮训调度； 负载均衡;      
    3  协议。  http2.0   长连接(keep leave) 和 多路复用(100/6 链式请求(串行请求) => 并行请求 6-8个)   多路复用 + url分发;      
    4  dns 预解析   <link rel="dns-prefetch"  value= 'xxx'/>
    5-1  减小资源体积 ：
        分包: 动态导入。import()    react => React.lazy 16.3
        js： webpack2及以上自带tree shaking功能，
        css：
        .glob-all 的作用就是帮助 PurifyCSS 进行路径处理，定位要做 Tree Shaking 的路径文件
        .extract-text-webpack-plugin  讲css提出css文件
        .PurifyCSS css treeshaking  
        img：
        图片资源上传的时候适当压缩; npm包 sharp
        请求的资源名后缀+.webj  拿到的img体积也会变小;
        雪碧图 
    5-2 减少请求 
    6 服务端渲染 

###  资源的执行（代码层面）
    1  比如 css的书写 ; 
    2  比如async await使用不当，会导致并行请求被串行化；
    3  正则的贪婪匹配引发的灾难性回溯 ;
    4  减少dom操作;
    5 具体到react方面的话: 
        16.5react-devtools出了profiler  类比 谷歌调试器的 performance
    Profiler组件 查看性能数据
        
       类组件 PureComponent(相当于在ShouldComponentUpdate里做了浅比较,如果没区别就直接返回false，不二次render)、 shouldComponentUpdate 与 React.memo 
       函数式组件   useMemo  useCallback  等 
       <>空标签等  
