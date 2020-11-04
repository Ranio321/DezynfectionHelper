export interface Centroid {
  x: number;
  y: number;
}

export function getPolygonCentroid(points: any): Centroid {
  var centroid: Centroid = { x: 0, y: 0 };
  for (var i = 0; i < points.length; i++) {
    var point = points[i];
    centroid.x += point.x;
    centroid.y += point.y;
  }
  centroid.x /= points.length;
  centroid.y /= points.length;
  return centroid;
}
