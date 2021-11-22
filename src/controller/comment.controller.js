const { create, reply, update, remove, commentList } = require("../service/comment.service")


class CommentController {
  async create (ctx, next) {
    const { content, actionId } = ctx.request.body;
    const userId = ctx.user.id;
    const result = await create(content, actionId, userId)
    ctx.body = result
  }

  // 回复接口
  async reply (ctx, next) {
    const { content, actionId } = ctx.request.body;
    const userId = ctx.user.id;
    const commentId = ctx.request.params.commentId
    const result = await reply(content, actionId, userId, commentId)
    ctx.body = result
  }

  async update (ctx, next) {
    const { content } = ctx.request.body;
    const commentId = ctx.request.params.commentId;
    const result = await update(content, commentId)
    ctx.body = result
  }

  async remove (ctx, next) {
    const commentId = ctx.request.params.commentId;
    const result = await remove(commentId)
    ctx.body = result
  }

  // 获取评论列表
  async commentList (ctx, next) {
    const { actionId } = ctx.request.query;
    const result = await commentList(actionId);
    ctx.body = result
  }
}


module.exports = new CommentController()