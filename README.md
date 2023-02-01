# page-update

前端重新部署通知用户刷新网页

## 痛点、应用场景

当页面迭代上线之后，用户停留在老页面（更新之后=》加入浏览器标签---访问页面、不加入浏览器标签--访问页面：：涉及系统权限是否过期），用户不知道网页重新部署了，体验不到新功能 或者跳转页面时候 有时 js 连接 hash 变了导致报错跳不过去

### 应用场景

### 知识点：

1.  浏览器缓存 html 文件 --- 缓存机制
2.  单页面应用-每次打包 html 引入 js 文件的 hash 值会变

### 痛点：

页面更新之后，不刷新页面的情况下，用户如何快速访问到新功能或者告知用户有新功能更新，不能老是提醒用户刷新 不友好 不智能 不专业

## 解决方案

### 后端支持

使用 webSocket 和后端进行实时通讯，前端页面部署完之后，后端给通知，前端给 Message 进行提示；
可以优化使用 EvnentSource 或 socket 智能后端往前端推送消息，前端无法给后端发送通信，此需求也不需要给后端发送；

#### 知识点

1. EvnentSource 和 webSocket 区别

   1. WebSocket 基于 TCP 协议，EventSource 基于 http 协议。---- TCP http 区别？？
   2. EventSource 是单向通信，而 websocket 是双向通信。
   3. EventSource 只能发送文本，而 websocket 支持发送二进制数据。--- 封装过 websocket 插件
   4. 在实现上 EventSource 比 websocket 更简单。
   5. EventSource 有自动重连接（不借助第三方）以及发送随机事件的能力。
   6. websocket 的资源占用过大 EventSource 更轻量。
   7. websocket 可以跨域，EventSource 基于 http 跨域需要服务端设置请求头。--- 跨域

2. 页面中使用长轮询 setTimeout、setInterval 区别

### 前端自己实现

1. 对比 meta 标签中 version：通过往 html 文件 插入 meta 标签 带上 version 版本号，轮询 对比 新更新页面和旧页面 version，当 version 不一样时，提醒用户页面有更新 做操作（刷新页面）
2. 对比引入 js 文件 hash 值不同：单页面文件都需要通过打包成 html、js、静态文件，轮询 对比 html 文件中引入 js 文件的 hash 值，当值不同时，提醒用户页面有更新 做操作（刷新页面）

#### 两者区别

1.  若 html 中没有插入 version 则需要手动引入 sethtml 插件 加入 meta 标签
2.  系统框架不一样 vue3 vue2 webpack vite 打包方式不一致 则做不到开箱即用 --- 封装 vite 插件
3.  插入 version 有可能不更新 version 的情况下

4.  根据每次打包后 js hash 值进行 轮询判断
    开箱即用

## 代码实现
