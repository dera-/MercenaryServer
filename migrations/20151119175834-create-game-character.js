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
    'game_character',
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
      player_id:
      {
        type: 'int',
        unsigned: true,
        notNull: true,
        length: 10,
        foreignKey: {
          name: 'game_character_player_id_fk',
          table: 'player',
          rules: {
            onDelete: 'CASCADE',
            onUpdate: 'RESTRICT'
          },
          mapping: 'id'
        }
      },
      chara_type:
      {
        type: 'char',
	values: ['PLAYER', 'FRIEND', 'ALLY'],
        notNull: true,
        length: 10,
      },
      name:
      {
        type: 'char',
        notNull: true,
        length: 100
      },
      image_key:
      {
        type: 'char',
        notNull: true,
        length: 255
      },
      lv_limit:
      {
        type: 'int',
        unsigned: true,
        notNull: true,
        length: 10
      },
      cost:
      {
        type: 'int',
        unsigned: true,
        notNull: true,
        length: 10
      },
      hp:
      {
        type: 'int',
        unsigned: true,
        notNull: true,
        length: 10
      },
      attack:
      {
        type: 'int',
        unsigned: true,
        notNull: true,
        length: 10
      },
      defense:
      {
        type: 'int',
        unsigned: true,
        notNull: true,
        length: 10
      },
      hit:
      {
        type: 'int',
        unsigned: true,
        notNull: true,
        length: 10
      },
      avoid:
      {
        type: 'int',
        unsigned: true,
        notNull: true,
        length: 10
      },
      intelligence:
      {
        type: 'int',
        unsigned: true,
        notNull: true,
        length: 10
      },
      luck:
      {
        type: 'int',
        unsigned: true,
        notNull: true,
        length: 10
      },
      magic_attack:
      {
        type: 'int',
        unsigned: true,
        notNull: true,
        length: 10
      },
      magic_defense:
      {
        type: 'int',
        unsigned: true,
        notNull: true,
        length: 10
      },
      move:
      {
        type: 'int',
        unsigned: true,
        notNull: true,
        length: 10
      },
      possession:
      {
        type: 'int',
        unsigned: true,
        notNull: true,
        length: 10
      },
      brain_id:
      {
        type: 'int',
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
  return db.dropTable('game_character');
};
