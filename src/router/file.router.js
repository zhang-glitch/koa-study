const Router = require("koa-router");
const { createAvatar, createPicture } = require("../controller/file.controller");
const { verifyAuth, verifyPermission } = require("../middleware/auth.middleware")
const { avatarHandler, pictureHandler, pictureResizeHandler } = require("../middleware/file.middleware")
const fileRouter = new Router({
  prefix: "/upload"
});


// 处理用户头像
fileRouter.post("/createAvatar", verifyAuth, avatarHandler, createAvatar);


// 处理action动态图像,需要携带actionId
fileRouter.post('/createPicture', verifyAuth, pictureHandler, pictureResizeHandler, createPicture)
module.exports = fileRouter