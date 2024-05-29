```
next-react-notes
├─ app
│ ├─ note
│ │ ├─ [id]
│ │ │ └─ page.js
│ │ └─ edit
│ │ ├─ [id]
│ │ │ └─ page.js
│ │ └─ page.js
│ ├─ layout.js
│ └─ page.js



// 1. 首页 /
// 2. /note/xxxx ,渲染具体笔记内容
// 3. /note/edit ,编辑路由
// 4. /note/edit/xxxx ，具体的编辑路由
```

```
redis 版本过低时，调用 redis.hset 可能会报错：Error: ERR wrong number of arguments for 'hset' command

解决：
  使用 docker 安装 latest 版本
  https://cloud.tencent.com/developer/article/1670205

```

```
React Server Component


1. 服务端组件的代码不会打包到客户端的 bundle 中

2. 服务端组件可以导入客户端组件，但客户端组件并不能导入服务端组件

3. 从服务端组件 到 客户端组件传递的数据需要可序列化，即：JSON.stringify 不能报错
    1）props传递
    2）children传递

4. 尽可能将客户端组件在组件树中下移， 尽可能缩减客户端组件的范围。

```
