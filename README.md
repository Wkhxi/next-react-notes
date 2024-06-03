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
// 2. /note/xxxx , 预览路由 渲染具体笔记内容
// 3. /note/edit , 新增路由
// 4. /note/edit/xxxx ，编辑路由
```

```shell
# markdown 转换为 HTML
npm i marked

# 清理 HTML，比如删除一些不良的写法，转义特殊字符等
npm i sanitize-html

# zod 用于数据校验
npm i zod

```

```
国际化：

1. react-i18next：定制化更高

npm i i18next i18next-resources-to-backend react-i18next

i18next-resources-to-backend 帮助我们读取 json 文件资源，生成字典。

i18n
├─ locales
│  ├─ en
│  │  ├─ basic.json
│  │  └─ footer.json
│  └─ zh
│     ├─ basic.json
│     └─ footer.json
└─ index.js

// i18n client.js
npm i react-cookie i18next-browser-languagedetector

2. next-intl 更简便
https://next-intl-docs.vercel.app/docs/getting-started/app-router

```

```
文件上传：

# 用于获取 MIME 类型信息
npm i mime

文件上传后写入到 public/uploads 文件下


```

```
支持 App Router 的 Authentication 解决方案：使用第三方网站认证用户身份，会得到一个token，这个token决定你的操作权限

https://authjs.dev/reference/nextjs#environment-variable-inferrence
https://next-auth.js.org/configuration/nextjs#in-app-router

# next-auth
npm install next-auth@beta

需求：使用 github 快捷登录

1. 在 GitHub 申请 OAuth 应用 https://github.com/settings/applications/new
    1）本地开发，所以 Homepage URL 填写 http://localhost:3000
    2）Authorization callback URL填写 http://localhost:3000/api/auth/callback/github，具体它的处理逻辑会由 next-auth 来实现
    3）生成 GitHub Client ID 和 GitHub secrets

2. 配置 GitHub Client ID 和 GitHub secrets  到 环境变量

    1）项目根目录下建立一个 .env 文件
    2）AUTH_SECRET 随机字符串，可以执行：openssl rand -base64 32 或者打开 generate-secret.vercel.app/32 获取一个随机值。


3. 添加 api 路由：新建 /app/api/auth/[...nextauth]/route.js



4. 服务端组件可以直接获取 session 信息 ： await auth()
   客户端组件可以通过 <SessionProvider session={session} /> 包裹来传递  session 信息
        <!-- 服务端组件中 -->
        import { SessionProvider } from "next-auth/react"
        <SessionProvider session={session}>
          <ClientComponent />
        </SessionProvider>

        <!-- 客户端组件中 -->
        import { useSession } from "next-auth/react"
        const { data: session, status } = useSession()



```

```
Prisma

1. npm install prisma --save-dev

2. 运行： npx prisma init


3. 新建 prisma文件夹 和 .env文件
    1）prisma/schema.prisma --> 定义数据模型
    2）.env --> 定义环境变量（如数据库地址）

4. 执行 npx prisma db pull ，测试是否连接成功


5. 定义数据模型，数据模型要与数据库保持一致
    1）修改数据模型，然后运行 npx prisma migrate dev 同步到数据库
            运行时随便起个名字
    2）修改数据库，然后运行 npx prisma db pull 同步到数据模型
            随后运行 prisma generate 来更新 PrismaClient

6. npm install @prisma/client

7. npx prisma studio


```

```
redis 版本过低时，调用 redis.hset 可能会报错：Error: ERR wrong number of arguments for 'hset' command

解决：
  redis版本过低导致
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

5. 使用 Suspense 包裹高延时性的组件

6. 所有组件都是服务器组件，除非它使用了 'use client' 指令，或者被导入到 'use client' 模块中。此时变成为客户端组件。就意味着它的代码要被打包到客户端 bundle 中。

7。 使用客户端组件时项，不要使用 async/await
```
