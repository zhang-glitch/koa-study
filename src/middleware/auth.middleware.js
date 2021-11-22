
const jwt = require("jsonwebtoken");
const { PUBLIC_KEY } = require("../app/config");

const { checkAction } = require("../service/auth.service")
const {
  USERNAME_OR_PASSWORD_NOT_INPUT,
  USERNAME_NOT_EXISTS,
  PASSWORD_ERROR,
  NOT_TAKE_AUTHORIZATION_TOKEN,
  UNAUTHORIZATION,
  NOT_PERMISSION
} = require("../app/errorType")
const { isExists } = require("../service/users.service");
const md5password = require("../utils/md5password");

// 验证登录
async function verifyLogin (ctx, next) {
  // 验证登录
  const { username, password } = ctx.request.body;
  // 用户名或者密码未输入
  if (!username || !password) {
    return ctx.app.emit("error", USERNAME_OR_PASSWORD_NOT_INPUT, ctx)
  }
  // 用户名错误
  const isExist = await isExists(username);
  const user = isExist[0]
  if (!user) {
    return ctx.app.emit("error", USERNAME_NOT_EXISTS, ctx)
  }
  // 密码错误
  if (md5password(password) !== user.password) {
    return ctx.app.emit("error", PASSWORD_ERROR, ctx)
  }

  // 验证成功后将user挂载到ctx上。
  ctx.user = user;
  await next();
}

// 验证授权,解密
async function verifyAuth (ctx, next) {
  const authorization = ctx.request.headers.authorization;
  if (!authorization) {
    return ctx.app.emit("error", NOT_TAKE_AUTHORIZATION_TOKEN, ctx);
  }
  const token = authorization.replace("Bearer ", "");

  try {
    const user = jwt.verify(token, PUBLIC_KEY, {
      algorithms: ["RS256"]
    })
    // 保存user数据，以后有用
    ctx.user = user
    await next()
  } catch (error) {
    console.log("error", error)
    ctx.app.emit("error", UNAUTHORIZATION, ctx);
  }

}


// 验证用户权限
async function verifyPermission (ctx, next) {
  const [idKeys] = Object.keys(ctx.params);
  const tableName = idKeys.replace("Id", "");
  const userId = ctx.user.id;
  const resourceId = ctx.request.params[idKeys];
  const result = await checkAction(tableName, userId, resourceId);
  if (!result) {
    return ctx.app.emit("error", NOT_PERMISSION, ctx)
  }
  await next()
}

module.exports = {
  verifyLogin,
  verifyAuth,
  verifyPermission
}