const Koa = require("koa");
const bodyParser = require("koa-bodyparser");
const usersRouter = require("../router/users.router")
const authRouter = require("../router/auth.router")
const errorHandle = require("./errorHandle");
const actionRouter = require("../router/action.router");
const commentRouter = require("../router/comment.router");
const fileRouter = require("../router/file.router");

const app = new Koa();

app.use(bodyParser())
app.use(usersRouter.routes())
app.use(usersRouter.allowedMethods())
app.use(authRouter.routes())
app.use(authRouter.allowedMethods())
app.use(actionRouter.routes())
app.use(actionRouter.allowedMethods())
app.use(commentRouter.routes())
app.use(commentRouter.allowedMethods())
app.use(fileRouter.routes())
app.use(fileRouter.allowedMethods())
app.on("error", errorHandle)


module.exports = app