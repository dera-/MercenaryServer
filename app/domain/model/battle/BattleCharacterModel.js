import MovingCharacterModel from 'MovingCharacterModel';
import CharacterMovingService from '../../service/CharacterMovingService';

export default class BattleCharacterModel {
  constructor(charaData) {
    this.id = parseInt(charaData.id, 10);
    this.lv = parseInt(charaData.lv, 10);
    this.exp = parseInt(charaData.exp, 10);
    this.maxHp = parseInt(charaData.hp, 10);
    this.currentHp = parseInt(charaData.hp, 10);
    this.attack = parseInt(charaData.attack, 10);
    this.defense = parseInt(charaData.defense, 10);
    this.hit = parseInt(charaData.hit, 10);
    this.avoid = parseInt(charaData.avoid, 10);
    this.intelligence = parseInt(charaData.intelligence, 10);
    this.luck = parseInt(charaData.luck, 10);
    this.magicAttack = parseInt(charaData.magicAttack, 10);
    this.magicDefense = parseInt(charaData.magicDefense, 10);
    this.move = parseInt(charaData.move, 10);
    this.jobs = jobs;
    this.brain = brain;
    this.charaType = parseInt(charaData.charaType);
    this.place = new Point(charaData.place_x, charaData.place_y);

    this.activeStatus = true;
  }

  damage(value) {
    this.currentHp -= value;
    if (this.currentHp <= 0) {
      this.currentHp = 0;
    }
  }

  recover(value) {
    this.currentHp += value;
    if (this.currentHp >= this.maxHp) {
      this.currentHp = this.maxHp;
    }
  }

  isAlive() {
    return this.currentHp > 0;
  }

  changeActiveStatus(activeStatus) {
    this.activeStatus = activeStatus;
  }

  getMovableRoutes(map, mapCharacters) {
    return CharacterMovingService.getMovableRoutes(
      map,
      mapCharacters,
      new MovingCharacterModel(this.id, this.charaType, this.place, this.move)
    );
  }

}