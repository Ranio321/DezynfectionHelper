import { CircleConfig } from "konva/types/shapes/Circle";
import React from "react";
import { Circle } from "react-konva";
import { snapSize } from "../../constants/SnapConstatns";
import params from "../grid/GridConstants";

interface CircleProps extends CircleConfig {}

export default function CustomCircle(props: CircleProps): JSX.Element {
  const { fill } = props;
  function snapToGrid() {
    let x;
    let y;
    if (props && props.x && props.y) {
      x = Math.round(props.x / snapSize) * snapSize;
      y = Math.round(props.y / snapSize) * snapSize;
    }
    return { x, y };
  }

  return (
    <Circle
      key="mouseCircle"
      {...snapToGrid()}
      radius={params.width / 7}
      fill={fill}
    />
  );
}
