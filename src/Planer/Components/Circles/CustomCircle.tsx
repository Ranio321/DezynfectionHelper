import { CircleConfig } from "konva/types/shapes/Circle";
import React, { useEffect } from "react";
import { Circle } from "react-konva";
import { createPropertySignature, JsxAttribute } from "typescript";
import { snapSize } from "../../Constants/SnapConstatns";
import params from "../Grid/GridConstants";

interface CircleProps extends CircleConfig {}

export default function CustomCircle(props: CircleProps): JSX.Element {
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
      fill={props.fill}
    />
  );
}
