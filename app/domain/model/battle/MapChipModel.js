export default class MapChipModel {
  constructor (data) {
    this.id = data['id'];
    this.fileNamePrefix = data['file_name_prefix'];
    this.name = data['name'];
    this.cost = data['cost'];
    this.recover = data['recover'];
    this.attack = data['attack'];
    this.defense = data['defense'];
    this.hit = data['hit'];
    this.avoid = data['avoid'];
    this.magicAttack = data['magic_attack'];
    this.magicDefense = data['magic_defense'];
  }
  getId () {
    return this.id;
  }
}