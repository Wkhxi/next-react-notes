import NextAuth from "next-auth";
import { NextResponse } from "next/server";
import GitHub from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { addUser, getUser } from "@/lib/prisma";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    CredentialsProvider({
      // 显示按钮文案 (e.g. "Sign in with...")
      name: "密码登录",
      // `credentials` 用于渲染登录页面表单
      credentials: {
        username: { label: "账号", type: "text", placeholder: "输入您的账号" },
        password: {
          label: "密码",
          type: "password",
          placeholder: "输入您的密码",
        },
      },
      // 处理从用户收到的认证信息
      async authorize(credentials, req) {
        // 默认情况下不对用户输入进行验证，确保使用 Zod 这样的库进行验证
        let user = null;

        // 登陆信息验证
        user = await getUser(credentials.username, credentials.password);

        // 密码错误
        if (user === 1) return null;

        // 用户注册
        if (user === 0) {
          user = await addUser(credentials.username, credentials.password);
        }

        if (!user) {
          throw new Error("User was not found and could not be created.");
        }

        return user;
      },
    }),
    GitHub,
  ],
  // pages: {
  //   signIn: "/auth/signin",
  // },
  callbacks: {
    authorized({ request, auth }) {
      // 如果 返回的 是 Response 那么这个函数结束 就直接结束了
      // 如果 返回的 不是 Response
      //        1. 如果中间件中 auth函数传了自定义的中间件逻辑处理函数，那就继续执行中间件函数
      // 如果返回的 不是 Response 且 没传 中间件函数

      const { pathname } = request.nextUrl;
      console.log("pathname =================>", pathname, auth);
      if (
        (pathname.startsWith("/en/note/edit") ||
          pathname.startsWith("/zh/note/edit")) &&
        !auth
      ) {
        const signInUrl = request.nextUrl.clone();
        console.log("signInUrl", signInUrl);
        signInUrl.pathname = "/api/auth/signin";
        signInUrl.searchParams.set("callbackUrl", request.nextUrl.href);
        return NextResponse.redirect(signInUrl);
      }
      return true;
    },
    async jwt({ token, user, account }) {
      if (account && account.type === "credentials" && user) {
        token.userId = user.userId;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.userId = token.userId;
      return session;
    },
  },
});
