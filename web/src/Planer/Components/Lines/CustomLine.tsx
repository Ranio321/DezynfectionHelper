import { Circle, Line } from "react-konva";
import Konva from "konva";
import React, { useEffect, useMemo, useRef, useState } from "react";
import params from "../grid/GridConstants";
import { Line as LineType } from "konva/types/shapes/Line";
import { snapToGrid } from "../../utils/snapToGrid";

export interface LineProps extends Konva.LineConfig {
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
  const {
    onMouseOverColor,
    stroke,
    points,
    uniqueId,
    isSelected,
    shouldSetItem,
  } = props;

  const defaultStrokeWidth = useMemo(() => params.width / 8, []);
  const lineRef = useRef<LineType>(null);
  const [color, setColor] = useState(stroke);
  const [strokeWidth, setStrokeWidth] = useState(defaultStrokeWidth);
  const [pointsCoords] = useState(() => snapToGrid(points));

  function onClick() {
    if (props.setCurrentItemId && props.shouldSetItem) {
      props.setCurrentItemId(props.uniqueId);
    }
  }

  function onMouseOver() {
    if (!isSelected && onMouseOverColor && shouldSetItem) {
      setStrokeWidth((8 * defaultStrokeWidth) / 6);
      setColor(onMouseOverColor);
    }
  }

  function onMouseLeave() {
    if (!isSelected) {
      setStrokeWidth(defaultStrokeWidth);
      setColor(stroke);
    }
  }

  useEffect(() => {
    if (!isSelected) {
      setStrokeWidth(defaultStrokeWidth);
      setColor(stroke);
    }
  }, [isSelected, stroke, defaultStrokeWidth]);

  return (
    <>
      <Line
        key={uniqueId}
        points={snapToGrid(props.points)}
        stroke={color}
        strokeWidth={strokeWidth}
        ref={lineRef}
        onClick={onClick}
        onMouseOver={onMouseOver}
        onMouseLeave={onMouseLeave}
      />
      <Circle
        radius={5}
        x={pointsCoords[0]}
        y={pointsCoords[1]}
        stroke="gray"
      />
      <Circle
        radius={5}
        x={pointsCoords[2]}
        y={pointsCoords[3]}
        stroke="gray"
      />
    </>
  );
}
