import { handlers } from "auth";
export const { GET, POST } = handlers;

// 当你创建了 /app/api/auth/[...nextauth]/route.js时，以下这些路由就都由 next-auth 创建并处理了：
// GET/api/auth/signin
// POST/api/auth/signin/:provider
// GET/POST/api/auth/callback/:provider
// GET/api/auth/signout
// POST/api/auth/signout
// GET/api/auth/session
// GET/api/auth/csrf
// GET/api/auth/providers

// 例如： SignIn 按钮的时候，跳转到 localhost:3000/api/auth/signin

/**
 * 1. 在 http://localhost:3000/api/auth/signin?callbackUrl=xxx 界面
 *    点击 sign in with github 按钮 会提交一个 post 请求，http://localhost:3000/api/auth/signin/github
 *    此时 provider参数 就是 github
 */

/**
 * 2. next-auth 会根据 auth.js 提供的选项计算 GitHub 登陆所需的值如 client_id（AUTH_GITHUB_ID）、scopes（权限范围） 等，然后拼接跳转到 https://github.com/login
 *
 * https://github.com/login?client_id=xxx&return_to=xxx
 *
 * 对 return_to 进行解码：能得到：code_challenge / code_challenge_method / redirect_uri 等参数
 *
 */

/**
 * 3. 在 GitHub 完成授权后，GitHub 会重定向到我们之前在 OAuth App 中设置的Authorization callback URL也就是 http://localhost:3000/api/auth/callback/github
 */
