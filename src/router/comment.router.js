const Router = require("koa-router");
const { create, reply, update, remove, commentList } = require("../controller/comment.controller");
const { verifyAuth, verifyPermission } = require("../middleware/auth.middleware")


const commentRouter = new Router({
  prefix: '/comment'
})


commentRouter.post("/create", verifyAuth, create)
commentRouter.post("/reply/:commentId", verifyAuth, reply)
commentRouter.patch("/update/:commentId", verifyAuth, verifyPermission, update)
commentRouter.delete("/delete/:commentId", verifyAuth, verifyPermission, remove)
commentRouter.get("/commentList", commentList)

module.exports = commentRouter