const { createAvatar, createPicture } = require("../service/file.service");
const { APP_HOST } = require("../app/config");
const { saveAvatar } = require("../service/users.service");

class FileController {

  // 创建用户头像
  async createAvatar (ctx, next) {
    const { filename, mimetype, size } = ctx.req.file;
    const userId = ctx.user.id;
    const result = await createAvatar(filename, mimetype, size, userId)
    // 将头像的url保存到users表中
    const avatarUrl = `${APP_HOST}/users/avatar/${userId}`
    await saveAvatar(avatarUrl, userId)
    ctx.body = result
  }

  // 创建action图像
  async createPicture (ctx, next) {
    console.log("ctx.req.files", ctx.req.files)
    const files = ctx.req.files;
    const userId = ctx.user.id;
    const actionId = ctx.request.query.actionId;
    for (let file of files) {
      const { filename, mimetype, size } = file
      await createPicture(filename, mimetype, size, userId, actionId)
    }
    ctx.body = "上传成功"
  }

}

module.exports = new FileController()