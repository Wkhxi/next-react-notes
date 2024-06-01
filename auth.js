import NextAuth from "next-auth";
import { NextResponse } from "next/server";
import GitHub from "next-auth/providers/github";
export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [GitHub],
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
  },
});
