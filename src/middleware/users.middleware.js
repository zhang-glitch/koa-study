const { USERNAME_OR_PASSWORD_NOT_INPUT, USER_ALREADY_EXISTS } = require("../app/errorType")
const { isExists } = require("../service/users.service")

async function verify (ctx, next) {
  // 判断用户是否输入用户名或者密码。
  const { username, password } = ctx.request.body
  if (!username || !password) {
    // 没有输入
    return ctx.app.emit("error", USERNAME_OR_PASSWORD_NOT_INPUT, ctx)
  }

  const result = await isExists(username);
  // 判断用户名是否重复
  if (result.length) {
    return ctx.app.emit("error", USER_ALREADY_EXISTS, ctx)
  }

  await next();
}


module.exports = {
  verify
}