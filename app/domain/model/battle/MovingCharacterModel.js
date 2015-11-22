import MapCharacterModel from './MapCharacterModel';

export default class MovingCharacterModel extends MapCharacterModel {
  constructor(id, charaType, place, move) {
    super(id, charaType, place);
    this.move = move;
  }
}
