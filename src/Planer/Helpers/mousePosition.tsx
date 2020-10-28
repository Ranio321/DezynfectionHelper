export function getMousePosition(e: any, layerRef: any) {
  var transform = layerRef.current.getAbsoluteTransform().copy();
  transform.invert();

  const pos = e.target.getStage().getPointerPosition();

  var circlePos = transform.point(pos);
  var points = { x: circlePos.x, y: circlePos.y };
  return points;
}
