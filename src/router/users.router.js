const Router = require("koa-router");
const { create, getUserAvatar } = require("../controller/users.controller")
const { verify } = require("../middleware/users.middleware")

const usersRouter = new Router({ prefix: '/users' });


usersRouter.post("/register", verify, create)
usersRouter.get("/avatar/:userId", getUserAvatar)


module.exports = usersRouter