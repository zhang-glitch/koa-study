const Router = require("koa-router");
const { create, detail, actionList, update, remove, getActionPictureByFileName } = require("../controller/action.controller")
const { verifyAuth, verifyPermission } = require("../middleware/auth.middleware")


const actionRouter = new Router({
  prefix: '/action'
})


actionRouter.post("/create", verifyAuth, create)
actionRouter.get("/detail/:actionId", detail)
actionRouter.get("/actionList", actionList)
actionRouter.patch("/update/:actionId", verifyAuth, verifyPermission, update)
actionRouter.delete("/delete/:actionId", verifyAuth, verifyPermission, remove)
// 返回action图片接口,这里还可以传入查询字符串type来指定返回的图片大小。
actionRouter.get("/images/:filename", getActionPictureByFileName)


module.exports = actionRouter