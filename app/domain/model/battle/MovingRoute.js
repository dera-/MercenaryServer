export default class MovingRoute {
  constructor(points, cost, stoppable = true) {
    this.points = points;
    this.cost = cost;
    this.stoppable = stoppable;
  }

  // pointsが引数の移動経路と同一かどうか
  isSameRoute(targetRoute) {
    let targetPoints = targetRoute.points;
    if (targetPoints.length !== this.points.length) {
      return false;
    }
    for (let i = 0; i < targetPoints.length; i++) {
      if (!targetPoints[i].isSamePoint(this.points[i])) {
        return false;
      }
    }
    return true;
  }

  getReachPlace() {
    return this.points.length > 0 ? this.points[this.points.length-1] : null;
  }

  // 座標とその座標に辿り着くまでのルートからMovingRouteオブジェクトを生成する
  static createFromRoute(beforeRoute, point, cost, stoppable = true) {
    let points = beforeRoute.points.slice();
    points.push(point);
    return new MovingRoute(points, beforeRoute.cost+cost, stoppable);
  }
}
