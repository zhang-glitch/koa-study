
const app = require("./app/index");
// 将.env变量挂载到process.env对象上
require("./app/config");
require("./app/database")

app.listen(process.env.APP_PORT, () => {
  console.log(`项目启动在${process.env.APP_PORT}端口`)
})