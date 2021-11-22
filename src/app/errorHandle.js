const {
  USERNAME_OR_PASSWORD_NOT_INPUT,
  USER_ALREADY_EXISTS,
  USERNAME_NOT_EXISTS,
  PASSWORD_ERROR,
  NOT_TAKE_AUTHORIZATION_TOKEN,
  UNAUTHORIZATION,
  NOT_PERMISSION
} = require("./errorType");

const errorHandle = (errorMessage, ctx) => {
  let status, message;
  switch (errorMessage) {
    case USERNAME_OR_PASSWORD_NOT_INPUT:
      status = 400; // Bad Request
      message = "用户名或者密码不能为空~";
      break;
    case USER_ALREADY_EXISTS:
      status = 409; // conflict
      message = "用户名已经存在~";
      break;
    case USERNAME_NOT_EXISTS:
      status = 400; // 参数错误
      message = "用户名不存在~";
      break;
    case PASSWORD_ERROR:
      status = 400; // 参数错误
      message = "密码是错误的~";
      break;
    case NOT_TAKE_AUTHORIZATION_TOKEN:
      status = 401; // 参数错误
      message = "未携带token~";
      break;
    case UNAUTHORIZATION:
      status = 401; // 参数错误
      message = "无效的token~";
      break;
    case NOT_PERMISSION:
      status = 401; // 参数错误
      message = "您不具备操作的权限~";
      break;
    default:
      status = 404;
      message = "NOT FOUND";
  }

  ctx.status = status;
  ctx.body = message;
}


module.exports = errorHandle