import mysql from 'mysql';
import DbConnection from '../DbConnection';

const DB_NAME = 'mercenary';
const TABLE_NAME = 'player';

export default class PlayerDao {
  constructor() {
    this.dbConnection = DbConnection.getInstance(DB_NAME);
  }

  find(id) {
    let query = 'SELECT * FROM #{TABLE_NAME} WHERE id = ?';
    return this.dbConnection.execQuery(mysql.format(query, [id]));
  }
}