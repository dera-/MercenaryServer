import mysql from 'mysql';
import DbConnection from '../DbConnection';
import DbConfig from '../../../../config/db';

export default class PlayerDao {
  constructor() {
    this.dbConnection = DbConnection.getConnection('game');
  }

  findByUserId(userId) {
    let query = 'SELECT * FROM player WHERE user_id = ?';
    return this.dbConnection.execQueryInPool(mysql.format(query, [userId]))
      .then((data) => Promise.resolve(data.length === 0 ? {} : data[0]))
      .catch((error) => {
        return Promise.reject(error);
      });
  }

  registerNewPlayer(userId, name) {
    let query = 'INSERT INTO player (user_id, name, created_at, updated_at) VALUES (?, ?, NOW(), NOW())';
    return this.dbConnection.execQueryInPool(mysql.format(query, [userId, name]));
  }

  updateData(playerData) {
    let query = 'UPDATE player SET money = ?, command_score = ?, popularity_score = ?, diplomacy_score = ?, development_score = ?, updated_at = NOW() WHERE user_id = ?';
    return this.dbConnection.execQueryInPool(
      mysql.format(
        query,
        [
          playerData['money'],
          playerData['command_score'],
          playerData['popularity_score'],
          playerData['diplomacy_score'],
          playerData['development_score'],
          playerData['user_id']
        ]
      )
    );
  }
}
