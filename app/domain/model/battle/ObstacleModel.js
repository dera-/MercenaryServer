import Point from '../util/Point';

export default class ObstacleModel {
  constructor(data) {
    this.id = data['id'];
    this.fileNamePrefix = data['file_name_prefix'];
    this.name = data['name'];
    this.width = data['width'];
    this.height = data['height'];
    this.maxHp = data['hp'];
    this.currentHp = data['hp'];
    this.point = new Point(data['x'], data['y']);

    this.modelId = this.point.x + 1000 * this.point.y; //MAPにおける一意な数値を生成
  }

  getModelId() {
    return this.modelId;
  }
}
