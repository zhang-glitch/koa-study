
const jwt = require("jsonwebtoken");
const { PRIVATE_KEY } = require("../app/config");

class AuthController {
  async login (ctx, next) {
    // 登陆成功后取出user
    const { id, username } = ctx.user;
    // 生成token
    const token = jwt.sign({ id, username }, PRIVATE_KEY, {
      // 设置过期时间
      expiresIn: 60 * 60 * 24,
      // 设置编码格式
      algorithm: 'RS256'
    })
    ctx.body = {
      id,
      username,
      token
    }
  }

  async success (ctx, next) {
    ctx.body = ctx.user
  }
}


module.exports = new AuthController()