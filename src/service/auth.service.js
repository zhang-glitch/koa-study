
const connection = require("../app/database")

class AuthService {
  // 用于操作鉴权的。验证是否是同一用户来操作更新，删除。
  async checkAction (tableName, userId, resourceId) {
    const state = `SELECT * FROM ${tableName} WHERE user_id = ? AND id = ?;`;
    const result = await connection.execute(state, [userId, resourceId]);
    return result[0].length ? true : false
  }
}


module.exports = new AuthService()