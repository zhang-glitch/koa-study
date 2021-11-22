const connection = require("../app/database");

class ActionService {
  async create (content, userId) {
    // 创建
    const state = `INSERT INTO action (content, user_id) VALUES (?, ?);`
    const result = await connection.execute(state, [content, userId])
    return result[0]
  }

  // 查找详情
  async detail (id) {
    const state = `SELECT 
      a.id id, 
      a.content content, 
      a.createAt createTime, 
      a.updateAt updateTime, 
      JSON_OBJECT( 'id', u.id, 'username', u.username, 'avatarUrl', u.avatar_url) user, 
      (SELECT JSON_ARRAYAGG(CONCAT('http://localhost:8000/action/images/', file.filename)) 
        FROM file WHERE a.id = file.action_id) images 
    FROM action a LEFT JOIN users u 
    ON a.user_id = u.id 
    WHERE a.id = ?;`;
    const result = await connection.execute(state, [id])
    return result[0]
  }

  // 获取分页列表
  async actionList (offset, pageSize) {
    const state = `SELECT 
      a.id id, 
      a.content content, 
      a.createAt createTime, 
      a.updateAt updateTime, 
      JSON_OBJECT( 'id', u.id, 'username', u.username, 'avatarUrl', u.avatar_url) user,
      (SELECT JSON_ARRAYAGG(CONCAT('http://localhost:8000/action/images/', file.filename)) 
        FROM file WHERE a.id = file.action_id) images, 
      (SELECT COUNT(*) FROM comment c WHERE c.action_id = a.id) commentCount 
    FROM action a LEFT JOIN users u 
    ON a.user_id = u.id 
    limit ?, ?;`;
    const result = await connection.execute(state, [offset, pageSize])
    return result[0]
  }

  // 更新action
  async update (content, actionId) {
    const state = `UPDATE action SET content = ? WHERE id = ?;`;
    const result = await connection.execute(state, [content, actionId])
    return result;
  }

  // 删除action
  async remove (actionId) {
    const state = `DELETE FROM action WHERE id = ?`;
    const result = await connection.execute(state, [actionId]);
    return result
  }
  
}


module.exports = new ActionService()