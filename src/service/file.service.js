
const connection = require("../app/database")
class FileService {
  async createAvatar (filename, mimetype, size, userId) {
    const state = `INSERT INTO avatar (filename, mimetype, size, user_id) VALUES (?, ?, ?, ?)`;
    const result = await connection.execute(state, [filename, mimetype, size, userId])
    return result[0]
  }

  // 获取头像图片详情
  async detailAvatar (userId) {
    const state = `SELECT * FROM avatar WHERE user_id = ?;`;
    const [result] = await connection.execute(state, [userId])
    return result.pop()
  }

  // 创建动态图片
  async createPicture (filename, mimetype, size, userId, actionId) {
    const state = `INSERT INTO file (filename, mimetype, size, user_id, action_id) VALUES (?, ?, ?, ?, ?)`;
    const result = await connection.execute(state, [filename, mimetype, size, userId, actionId])
    return result[0]
  }

  // 获取图片详情
  async getActionPictureInfoByFileName (filename) {
    const state = `SELECT * FROM file WHERE filename = ?;`;
    const [result] = await connection.execute(state, [filename])
    return result
  }
}

module.exports = new FileService()