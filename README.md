# page-update

前端重新部署通知用户刷新网页

https://mp.weixin.qq.com/s/hdlmqdaUajxJFnmxoMUf7A

利用 WebSocket 和 EventSource 实现服务端推送
https://www.jianshu.com/p/958eba34a5da

1.  根据 html 中插入 meta 标签 加入 version

轮询 对比两次 version 是否一致 不一致则提示更新

1.  若 html 中没有插入 version 则需要手动引入 sethtml 插件 加入 meta 标签
2.  系统框架不一样 vue3 vue2 webpack vite 打包方式不一致 则做不到开箱即用
3.  插入 version 有可能不更新 version 的情况下

4.  根据每次打包后 js hash 值进行 轮询判断
    开箱即用
