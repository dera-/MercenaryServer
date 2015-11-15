let DbConnections = new Map(),
  DbConfig = require('../../../config/db');

export default class DbConnection {
  constructor(dbName) {
    let mysql = require('mysql');
    this.connection = mysql.createConnection({
      host     : DbConfig.host, //接続先ホスト
      user     : DbConfig.user,      //ユーザー名
      password : DbConfig.password,  //パスワード
      database : dbName    //DB名
    });
    this.pool = mysql.createPool({
      connectionLimit : 10,
      host            : DbConfig.host,
      user            : DbConfig.user,
      password        : DbConfig.password,
      database        : dbName    //DB名
    });
  }

  static getConnection(dbName) {
    if (!DbConnections.has(dbName)) {
      DbConnections.set(dbName, new DbConnection(dbName))
    }
    return DbConnections.get(dbName);
  }

  execQueryInPool(query) {
    console.log('execQueryInPool');
    console.log(query);
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
    console.log('execQueryInConnection');
    console.log(query);
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
    console.log('transaction');
    return new Promise((resolve, reject)=>{
      this.connection.beginTransaction((error) => {
        if (error) {
          reject(error);
        }
        resolve();
      });
    });
  }

  commit(result) {
    console.log('commit');
    return new Promise((resolve, reject)=>{
      this.connection.commit((error) => {
        if (error) {
          reject(error);
        }
        resolve(result);
      });
    });
  }

  rollback() {
    console.log('rollback');
    this.connection.rollback();
  }
}