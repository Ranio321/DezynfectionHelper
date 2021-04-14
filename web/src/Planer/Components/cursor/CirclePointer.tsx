import React from "react";
import { MousePosition } from "../../PlanerTypes";
import CustomCircle from "../circles/CustomCircle";
interface CirclePointerProps {
  mousePosition: MousePosition;
}

export default function CirclePointer(props: CirclePointerProps): JSX.Element {
  const { mousePosition } = props;

  return (
    <CustomCircle
      x={mousePosition.x}
      y={mousePosition.y}
      radius={10}
      fill="black"
    />
  );
}
