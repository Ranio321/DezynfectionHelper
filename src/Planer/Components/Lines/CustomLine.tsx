import { Circle, Line } from "react-konva";
import Konva from "konva";
import React, { useEffect, useRef, useState } from "react";
import params from "../Grid/GridConstants";
import { Line as LineType } from "konva/types/shapes/Line";
import { snapToGrid } from "../../Helpers/snapToGrid";

interface LineProps extends Konva.LineConfig {
  snapToGrid?: Boolean;
  setCurrentItemId?: (id: number) => any;
  onMouseOverColor?: string;
  type?: string;
  uniqueId: number;
  shouldSetItem?: boolean;
  isSelected?: boolean;
  stroke?: string;
  currentItemId?: number;
}
export default function CustomLine(props: LineProps) {
  const { onMouseOverColor, stroke } = props;
  const lineRef = useRef<LineType>(null);
  const [color, setColor] = useState(stroke);
  const [strokeWidth, setStrokeWidth] = useState(params.width / 8);
  const [shapePoints, setShapePoints] = useState<number[]>([]);

  function onClick() {
    if (props.setCurrentItemId && props.shouldSetItem) {
      props.setCurrentItemId(props.uniqueId);
    }
  }

  function onMouseOver() {
    if (!props.isSelected && onMouseOverColor && props.shouldSetItem) {
      setStrokeWidth(params.width / 6);
      setColor(onMouseOverColor);
    }
  }

  function onMouseLeave() {
    if (!props.isSelected) {
      setStrokeWidth(params.width / 8);
      setColor(stroke);
    }
  }
  useEffect(() => {
    if (!props.isSelected) {
      setStrokeWidth(params.width / 8);
      setColor(stroke);
    }
  }, [props.isSelected, stroke]);

  // useEffect(() => {
  //   if (props.snapToGrid &&  props.points.length > 3) {
  //     setShapePoints(snapToGrid(props.points));
  //   }
  // }, [props.points]);

  console.log(shapePoints);
  return (
    <>
      <Line
        key={props.uniqueId}
        points={snapToGrid(props.points)}
        stroke={color}
        strokeWidth={strokeWidth}
        ref={lineRef}
        onClick={() => onClick()}
        onMouseOver={() => onMouseOver()}
        onMouseLeave={() => onMouseLeave()}
      />
      <Circle
        radius={5}
        x={snapToGrid(props.points)[0]}
        y={snapToGrid(props.points)[1]}
        stroke="gray"
      />
      <Circle
        radius={5}
        x={snapToGrid(props.points)[2]}
        y={snapToGrid(props.points)[3]}
        stroke="gray"
      />
    </>
  );
}
