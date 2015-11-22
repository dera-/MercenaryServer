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
  return db.createTable('test_table',
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
    text:
    {
      type: 'char',
      notNull: true,
      length: 255
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
    }
  }
  );
};

exports.down = function(db) {
  return db.dropTable('test_table');
};

