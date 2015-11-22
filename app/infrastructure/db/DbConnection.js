import DbConfig from '../../../config/db';
let env = process.env.NODE_ENV || 'dev';
const DbConnections = new Map();

export default class DbConnection {
  constructor(dbNameKey) {
    let mysql = require('mysql');
    this.connection = mysql.createConnection({
      host     : DbConfig[env].host, //接続先ホスト
      user     : DbConfig[env].user,      //ユーザー名
      password : DbConfig[env].password,  //パスワード
      database : DbConfig[env]['db_names'][dbNameKey]    //DB名
    });
    this.pool = mysql.createPool({
      connectionLimit : 10,
      host            : DbConfig[env].host,
      user            : DbConfig[env].user,
      password        : DbConfig[env].password,
      database        : DbConfig[env]['db_names'][dbNameKey]    //DB名
    });
  }

  static getConnection(dbName) {
    if (!DbConnections.has(dbName)) {
      DbConnections.set(dbName, new DbConnection(dbName))
    }
    return DbConnections.get(dbName);
  }

  execQueryInPool(query) {
    return new Promise((resolve, reject)=>{
      this.pool.query(query, (error, result) => {
        if (error) {
          reject(error);
        }
        resolve(result);
      });
    });
  }

  execQueryInConnection(query) {
    return new Promise((resolve, reject)=>{
      this.connection.query(query, (error, result) => {
        if (error) {
          reject(error);
        }
        resolve(result);
      });
    });
  }

  beginTransaction() {
    return new Promise((resolve, reject)=>{
      this.connection.beginTransaction((error) => {
        if (error) {
          reject(error);
        }
        resolve();
      });
    });
  }

  commit() {
    return new Promise((resolve, reject)=>{
      this.connection.commit((error) => {
        if (error) {
          reject(error);
        }
        resolve();
      });
    });
  }

  rollback() {
    this.connection.rollback();
  }
}