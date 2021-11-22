const connection = require("../app/database")

class CommentService {
  async create (content, actionId, userId) {
    const state = `INSERT INTO comment (content, action_id, user_id) VALUES (?, ?, ?);`;
    const result = await connection.execute(state, [content, actionId, userId]);
    return result[0]
  }

  // 添加回复
  async reply (content, actionId, userId, commentId) {
    const state = `INSERT INTO comment (content, action_id, user_id, comment_id) VALUES (?, ?, ?, ?);`;
    const result = await connection.execute(state, [content, actionId, userId, commentId]);
    return result[0]
  }

  async update (content, commentId) {
    const state = `UPDATE comment SET content = ? WHERE id = ?`;
    const result = await connection.execute(state, [content, commentId])
    return result[0];
  }

  async remove (commentId) {
    const state = `DELETE FROM comment WHERE id = ?`;
    const result = await connection.execute(state, [commentId])
    return result[0];
  }

  async commentList (actionId) {
    const state = `SELECT 
      c.id id, c.comment_id commentId, c.content content, c.createAt createTime, c.updateAt updateTime, 
      JSON_OBJECT("id", u.id, "username", u.username) user
    FROM comment c 
    LEFT JOIN users u ON c.user_id = u.id 
    WHERE c.action_id = ?;`;
    const result = await connection.execute(state, [actionId])
    return result[0];
  }

}


module.exports = new CommentService()