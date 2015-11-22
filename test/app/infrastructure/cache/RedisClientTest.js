import assert from 'power-assert';
import Redis from 'redis-node';
import RedisClient from '../../../../app/infrastructure/cache/RedisClient';
import RedisConfig from '../../../../config/redis';

describe('RedisClientのテスト', () => {
  let redisClient,
    redisInstance,
    sampleKey = 'test.id:1:record',
    sampleObject = {id:1, text:'hoge', created_at:'2015-11-22 00:00:00'};
  before(done =>{
    redisClient = new RedisClient();
    redisInstance = Redis.createClient(RedisConfig.test.port, RedisConfig.test.host);
    done();
  });
  beforeEach(done => {
    redisInstance.set(sampleKey, JSON.stringify(sampleObject), (error, result) => {
      if (error) {
        console.error(error);
      }
      done();
    });
  });
  after(done => {
    redisInstance.flushall(didSucceed => {
      done();
    });
  });

  describe('getメソッド', () => {
    it('setされた文字列をオブジェクトとして取得できる', ()=>{
      return redisClient.get(sampleKey)
        .then(result => {
          assert(result.length === sampleObject.length);
          assert(result.id === sampleObject.id);
          assert(result.text === sampleObject.text);
          assert(result.created_at === sampleObject.created_at);
        });
    });
  });

  describe('setメソッド', () => {
    it('新規キーに指定したオブジェクトを新規登録できる', ()=>{
      let key = 'test.id:22:record',
        object = {id:22, text:'test', created_at:'2015-11-22 10:00:00'};
      return redisClient.set(key, object)
        .then(() => redisClient.get(key))
        .then(result => {
          assert(result.length === object.length);
          assert(result.id === object.id);
          assert(result.text === object.text);
          assert(result.created_at === object.created_at);
        });
    });
    it('既存キーを指定したオブジェクトで更新できる', ()=>{
      let object = {id:1, text:'test', created_at:'2015-11-22 10:00:00'};
      return redisClient.set(sampleKey, object)
        .then(() => redisClient.get(sampleKey))
        .then(result => {
          assert(result.length === object.length);
          assert(result.id === object.id);
          assert(result.text === object.text);
          assert(result.created_at === object.created_at);
        });
    });
  });

  describe('expireメソッド', () => {
    it('exprie_timeの変更が可能', ()=>{
      return redisClient.expire(sampleKey, 1)
        .then(() => redisClient.get(sampleKey))
        .then(result => {
          assert(result.length === sampleObject.length);
          assert(result.id === sampleObject.id);
          assert(result.text === sampleObject.text);
          assert(result.created_at === sampleObject.created_at);
          return new Promise((resolve, reject) => {
            setTimeout(() => {resolve()}, 1000);
          });
        })
        .then(() => redisClient.get(sampleKey))
        .then(result => {
          assert(result === null);
        });
    });
  });

  describe('setExメソッド', () => {
    it('対象キーへの値のセットとexprie_timeの更新が可能', () => {
      let key = 'test.id:22:record',
        object = {id:22, text:'test', created_at:'2015-11-22 10:00:00'};
      return redisClient.setEx(key, object, 1)
        .then(() => redisClient.get(key))
        .then(result => {
          assert(result.length === object.length);
          assert(result.id === object.id);
          assert(result.text === object.text);
          assert(result.created_at === object.created_at);
          return new Promise((resolve, reject) => {
            setTimeout(() => {resolve()}, 1000);
          });
        })
        .then(() => redisClient.get(key))
        .then(result => {
          assert(result === null);
        });
    });
  });

  describe('cacheメソッド', () => {
    let object = {id:23, text:'callback', created_at:'2015-11-23 00:00:00'},
      getObject = () => object;
    it('redisに保存されている値の取得とexprie_timeの更新が可能', () => {
      return redisClient.cache(sampleKey, getObject, 1)
        .then(result => {
          assert(result.length === sampleObject.length);
          assert(result.id === sampleObject.id);
          assert(result.text === sampleObject.text);
          assert(result.created_at === sampleObject.created_at);
          return new Promise((resolve, reject) => {
            setTimeout(() => {resolve()}, 1000);
          });
        })
        .then(() => redisClient.get(sampleKey))
        .then(result => {
          assert(result === null);
        });
    });
    it('対象キーの値がredisに保存されていない場合、コールバック関数の返り値を返した後にその値をredisに保存する', () =>{
      let key = 'test.id:23:record';
      return redisClient.cache(key, getObject)
        .then(result => {
          assert(result.length === object.length);
          assert(result.id === object.id);
          assert(result.text === object.text);
          assert(result.created_at === object.created_at);
          return redisClient.get(key);
        })
        .then(result => {
          assert(result.length === object.length);
          assert(result.id === object.id);
          assert(result.text === object.text);
          assert(result.created_at === object.created_at);
        });
    });
  });

});