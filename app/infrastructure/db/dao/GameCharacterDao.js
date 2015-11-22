import mysql from 'mysql';
import DbConnection from '../DbConnection';
import DbConfig from '../../../../config/db';

export default class GameCharacterDao {
  constructor() {
    this.dbConnection = DbConnection.getConnection('game');
  }

  findCharactersByPlayerId(playerId) {
    let query = 'SELECT * FROM game_character WHERE player_id = ?';
    return this.dbConnection.execQueryInPool(mysql.format(query, [playerId]));
  }

  insert(data) {
    let query = 'INSERT INTO game_character (player_id, chara_type, name, image_key, lv_limit, cost, hp, attack, defense, hit, avoid, intelligence, luck, magic_attack, magic_defense, move, possession, brain_id, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())';
    return this.dbConnection.execQueryInPool(
      mysql.format(
        query,
        [
          data['player_id'],
          data['chara_type'],
          data['name'],
          data['image_key'],
          data['lv_limit'],
          data['cost'],
          data['hp'],
          data['attack'],
          data['defense'],
          data['hit'],
          data['avoid'],
          data['intelligence'],
          data['luck'],
          data['magic_attack'],
          data['magic_defense'],
          data['move'],
          data['possession'],
          data['brain_id']
        ]
      )
    );
  }

  update(data) {
    let query = 'UPDATE game_character SET player_id=?, chara_type=?, name=?, image_key=?, lv_limit=?, cost=?, hp=?, attack=?, defense=?, hit=?, avoid=?, intelligence=?, luck=?, magic_attack=?, magic_defense=?, move=?, possession=?, brain_id=?, updated_at=NOW() WHERE id=?';
    return this.dbConnection.execQueryInPool(
      mysql.format(
        query,
        [
          data['player_id'],
          data['chara_type'],
          data['name'],
          data['image_key'],
          data['lv_limit'],
          data['cost'],
          data['hp'],
          data['attack'],
          data['defense'],
          data['hit'],
          data['avoid'],
          data['intelligence'],
          data['luck'],
          data['magic_attack'],
          data['magic_defense'],
          data['move'],
          data['possession'],
          data['brain_id'],
          data['id']
        ]
      )
    );
  }
}