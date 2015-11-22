// マップ上のキャラクターデータを保持するクラス
export default class MapCharacterModel {
  constructor(id, charaType, place) {
    this.id = id;
    this.charaType = charaType;
    this.place = place;
  }
  isSamePlace(place) {
    return place.x === this.place.x && place.y === this.place.y;
  }
}