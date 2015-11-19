'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db) {
  return db.createTable('user',
  {
    id:
    {
      type: 'int',
      unsigned: true,
      notNull: true,
      primaryKey: true,
      autoIncrement: true,
      length: 10
    },
    name:
    {
      type: 'char',
      notNull: true,
      length: 100
    },
    twitter_id:
    {
      type: 'int',
      unique: true,
      unsigned: true,
      notNull: true,
      length: 10
    },
    created_at:
    {
      type: 'datetime',
      notNull: true
    },
    updated_at:
    {
      type: 'datetime',
      notNull: true
    },
  }
  );
};

exports.down = function(db) {
  return db.dropTable('user');
};
