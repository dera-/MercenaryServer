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
  return db.createTable(
    'player',
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
      user_id:
      {
        type: 'int',
        unique: true,
        unsigned: true,
        notNull: true,
        length: 10,
        foreignKey: {
          name: 'player_user_id_fk',
          table: 'user',
          rules: {
            onDelete: 'CASCADE',
            onUpdate: 'RESTRICT'
          },
          mapping: 'id'
        }
      },
      name:
      {
        type: 'char',
        notNull: true,
        length: 100
      },
      money:
      {
        type: 'int',
        unsigned: true,
        notNull: true,
        length: 10,
        defaultValue: 0
      },
      command_score:
      {
        type: 'int',
        unsigned: true,
        notNull: true,
        length: 10,
        defaultValue: 0
      },
      popularity_score:
      {
        type: 'int',
        unsigned: true,
        notNull: true,
        length: 10,
        defaultValue: 0
      },
      diplomacy_score:
      {
        type: 'int',
        unsigned: true,
        notNull: true,
        length: 10,
        defaultValue: 0
      },
      development_score:
      {
        type: 'int',
        unsigned: true,
        notNull: true,
        length: 10,
        defaultValue: 0
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
  return db.dropTable('player');
};
