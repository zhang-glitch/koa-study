
const connection = require("../app/database")
const md5password = require("../utils/md5password")

class UsersService {
  // 用户注册
  async create (user) {
    let { username, password } = user
    // 加密密码
    password = md5password(password)
    const state = `INSERT INTO users (username, password) VALUES (?, ?);`
    const result = await connection.execute(state, [username, password]);
    return result[0]
  }

  // 判断用户是否存在
  async isExists (username) {
    const state = `SELECT * FROM users WHERE username = ?;`;
    const result = await connection.execute(state, [username])
    return result[0];
  }

  // 保存用户头像
  async saveAvatar (avatarUrl, userId) {
    const state = `UPDATE users SET avatar_url = ? WHERE id = ?;`;
    const result = await connection.execute(state, [avatarUrl, userId])
    return result[0];
  }
}

module.exports = new UsersService()