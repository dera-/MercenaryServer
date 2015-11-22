import assert from 'power-assert';
import Cleaner from 'database-cleaner';
import DbConnection from '../../../../app/infrastructure/db/DbConnection';

describe('DbConnectionのテスト', () => {
  let testDbConnection,
    db_cleaner;
  before(done =>{
    testDbConnection = DbConnection.getConnection('test_db');
    db_cleaner = new Cleaner('mysql');
    done();
  });
  beforeEach(done => {
    db_cleaner.clean(testDbConnection.connection, () => {
      testDbConnection.connection.query("INSERT INTO test_table(id, text, created_at, updated_at) VALUES (1, 'hoge', NOW(), NOW())", (err, res) => {
        if (err) {
          console.log(err);
        }
        done();
      });
    });
  });
  after(done => {
    db_cleaner.clean(testDbConnection.connection, () => {
      done();
    });
  });

  describe('プールでのクエリ実行', () => {
    it('参照クエリ_FOUND', () => {
      return testDbConnection.execQueryInPool('SELECT text FROM test_table WHERE id = 1')
        .then(result => {
          assert(result.length === 1);
          assert(result[0].text === 'hoge');
        });
    });
    it('参照クエリ_NOTFOUND', () => {
      return testDbConnection.execQueryInPool('SELECT text FROM test_table WHERE id = 2')
        .then(result => {
          assert(result.length === 0);
        });
    });
    it('更新クエリと参照クエリの実行', () =>{
      return testDbConnection.execQueryInPool('UPDATE test_table SET text = "fuga" WHERE id = 1')
        .then(result => {
          assert(result);
          return testDbConnection.execQueryInPool('SELECT text FROM test_table WHERE id = 1');
        })
        .then(result => {
          assert(result.length === 1);
          assert(result[0].text === 'fuga');
        });
    });
  });

  describe('トランザクション内でのクエリ実行', () => {
    it('コミットできる', () => {
      return testDbConnection.beginTransaction()
        .then(() => testDbConnection.execQueryInConnection('INSERT INTO test_table (id, text, created_at, updated_at) VALUES (2, "new_record", NOW(), NOW())'))
        .then(result => {
          assert(result);
          return testDbConnection.execQueryInConnection('UPDATE test_table SET text = "fuga-" WHERE id = 1');
        })
        .then(result => {
          assert(result);
          return testDbConnection.commit();
        })
        .then(() => testDbConnection.execQueryInPool('SELECT text FROM test_table'))
        .then(result => {
          assert(result.length === 2);
          assert(result[0].text === 'fuga-');
          assert(result[1].text === 'new_record');
        });
    });
    it('ロールバックできる', () => {
      return testDbConnection.beginTransaction()
        .then(() => testDbConnection.execQueryInConnection('INSERT INTO test_table (id, text, created_at, updated_at) VALUES (2, "new_record", NOW(), NOW())'))
        .then(result => {
          assert(result);
          return testDbConnection.rollback();
        })
        .then(() => testDbConnection.execQueryInPool('SELECT text FROM test_table'))
        .then(result => {
          assert(result.length === 1);
          assert(result[0].text === 'hoge');
        });
    });
  });

});
