import mysql from 'mysql';
import DbConnection from '../DbConnection';
import DbConfig from '../../../../config/db';

export default class UserDao {
  constructor() {
    this.dbConnection = DbConnection.getConnection('game');
  }

  findByTwitterId(twitterId) {
    let query = 'SELECT * FROM user WHERE twitter_id = ?';
    return this.dbConnection.execQueryInPool(mysql.format(query, [twitterId]))
      .then((data) => Promise.resolve(data.length === 0 ? {} : data[0]))
      .catch((error) => {
        console.error('error in findByTwitterId');
        return Promise.reject(error);
      });
  }

  insert(userData){
    let query = 'INSERT INTO user (name, twitter_id, created_at, updated_at) VALUES (?, ?, NOW(), NOW())';
    return this.dbConnection.execQueryInPool(mysql.format(query, [userData.username, userData.id]));
  }
}
