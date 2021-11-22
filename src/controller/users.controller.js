
const path = require("path")
const fs = require("fs")
const { detailAvatar } = require("../service/file.service");
const { create } = require('../service/users.service')
const { AVATAR_PATH } = require("../app/filePath")

class UsersController {
  async create (ctx, next) {
    const user = ctx.request.body
    const result = await create(user)
    ctx.body = result
  }

  // 返回用户头像
  async getUserAvatar (ctx, next) {
    const { userId } = ctx.params;
    // 从数据库中获取当前图片的详情信息。然后用于本地获取图片。
    const avatarInfo = await detailAvatar(userId);

    // 2.提供图像信息,以便浏览器解析
    ctx.response.set('content-type', avatarInfo.mimetype);
    ctx.body = fs.createReadStream(path.resolve(__dirname, `${AVATAR_PATH}/${avatarInfo.filename}`));
  }
}


module.exports = new UsersController()