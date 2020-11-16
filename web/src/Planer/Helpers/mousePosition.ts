export function getMousePosition(layerRef: any) {
  var transform = layerRef.current.getAbsoluteTransform().copy();
  transform.invert();
  
  const pos = layerRef.current.getPointerPosition();

  var circlePos = transform.point(pos);
  var points = { x: circlePos.x, y: circlePos.y };
  return points;
}
