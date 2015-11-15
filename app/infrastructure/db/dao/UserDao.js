import mysql from 'mysql';
import DbConnection from '../DbConnection';

const DB_NAME = 'mercenary';
const TABLE_NAME = 'user';

export default class UserDao {
  constructor() {
    this.dbConnection = DbConnection.getConnection(DB_NAME);
  }

  findByTwitterId(twitterId) {
    let query = 'SELECT * FROM user WHERE twitter_id = ?';
    return this.dbConnection.execQueryInPool(mysql.format(query, [twitterId]))
      .then((data) => Promise.resolve(data.length === 0 ? {} : data[0]))
      .catch((error) => {
        console.log('error in findByTwitterId');
        return Promise.reject(error);
      });
  }

  insert(userData){
    console.log(userData);
    let query = 'INSERT INTO user (name, twitter_id, created_at, updated_at) VALUES (?, ?, NOW(), NOW())';
    return this.dbConnection.execQueryInPool(mysql.format(query, [userData.username, userData.id]))
    .catch((error) => {
      return Promise.reject(error);
    });
  }
}
