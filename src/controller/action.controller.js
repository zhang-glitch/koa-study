const fs = require("fs")
const path = require("path")
const { PICTURE_PATH } = require("../app/filePath")
const { create, detail, actionList, update, remove } = require("../service/action.service");
const { getActionPictureInfoByFileName } = require("../service/file.service");

class ActionController {
  async create (ctx, next) {
    const { id } = ctx.user;
    const { content } = ctx.request.body;
    await create(content, id)
    ctx.body = "发表成功~"
  }

  async detail (ctx, next) {
    const id = ctx.params.actionId;
    const result = await detail(id);
    ctx.body = result[0];
  }

  async actionList (ctx, next) {
    const { offset, pageSize } = ctx.request.query;
    const result = await actionList(offset, pageSize)
    ctx.body = result
  }

  // 更新action
  async update (ctx, next) {
    const actionId = ctx.request.params.actionId;
    const { content } = ctx.request.body;
    const result = await update(content, actionId);
    ctx.body = result[0]
  }

  // 删除action
  async remove (ctx, next) {
    const actionId = ctx.request.params.actionId;
    const result = await remove(actionId)
    ctx.body = result
  }

  // 返回action动态图片
  async getActionPictureByFileName (ctx, next) {
    // 通过params传入的filename
    const filename = ctx.request.params.filename;
    // 通过query传入的type
    const imageType = ctx.request.query.type;
    let imageUrl = ""
    const types = ["small", "middle", "large"];
    
    if (types.includes(imageType)) {
      imageUrl = path.resolve(__dirname, `${PICTURE_PATH}/${filename}-${imageType}`)
    } else {
      imageUrl = path.resolve(__dirname, `${PICTURE_PATH}/${filename}`)
    }
    const result = await getActionPictureInfoByFileName(filename)
    ctx.response.set("content-type", result[0].mimetype)
    ctx.body = fs.createReadStream(imageUrl)
  }
}


module.exports = new ActionController()