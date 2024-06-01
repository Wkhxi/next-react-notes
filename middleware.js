import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import { locales, defaultLocale } from "@/config.js";
import { NextResponse } from "next/server";
import { auth, signIn } from "auth";

const publicFile = /\.(.*)$/;
const excludeFile = ["logo.svg"]; // 白名单

function getLocale(request) {
  const headers = {
    "accept-language": request.headers.get("accept-language") || "",
  };

  // 这里不能直接传入 request
  // 获取浏览器语言首选项
  const languages = new Negotiator({ headers }).languages();

  // 建议使用用户在浏览器中的语言首选项来选择要使用的区域设置。更改你的首选语言将修改传入应用的 Accept-Language 标头。
  return match(languages, locales, defaultLocale);
}

// export async function middleware(request) {
//   const { pathname } = request.nextUrl;
//   // 判断请求路径中是否已存在语言，已存在语言则跳过
//   const pathnameHasLocale = locales.some(
//     (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
//   );

//   if (pathnameHasLocale) return;

//   // 如果是 public 文件，不重定向
//   if (
//     publicFile.test(pathname) &&
//     excludeFile.indexOf(pathname.substr(1)) == -1
//   )
//     return;

//   // 获取匹配的 locale
//   const locale = getLocale(request);
//   request.nextUrl.pathname = `/${locale}${pathname}`;

//   console.log("auth ======> ", await auth());

//   // 默认语言不重定向
//   if (locale === defaultLocale) {
//     return NextResponse.rewrite(request.nextUrl);
//   }
//   // 重定向，如 /products 重定向到 /en-US/products
//   return Response.redirect(request.nextUrl);
// }

export default auth(async function middleware(request) {
  console.log("request =====>", request.nextUrl.pathname);

  const { pathname } = request.nextUrl;

  // 判断请求路径中是否已存在语言，已存在语言则跳过
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return;

  // 如果是 public 文件，不重定向
  if (
    publicFile.test(pathname) &&
    excludeFile.indexOf(pathname.substr(1)) == -1
  )
    return;

  // 获取匹配的 locale
  const locale = getLocale(request);
  request.nextUrl.pathname = `/${locale}${pathname}`;

  // 默认语言不重定向
  if (locale === defaultLocale) {
    return NextResponse.rewrite(request.nextUrl);
  }
  // 重定向，如 /products 重定向到 /en-US/products
  return Response.redirect(request.nextUrl);
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
