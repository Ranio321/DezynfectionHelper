import { Layer, Line, Stage, Text } from "react-konva";
import Konva from "konva";
import React, { useEffect, useMemo, useRef, useState } from "react";
import params from "../Grid/GridConstants";
import { snapSize } from "../../Constants/SnapConstatns";
import { Item } from "../../pointsModels";
import { Line as LineType } from "konva/types/shapes/Line";

interface LineProps extends Konva.LineConfig {
  snapToGrid: Boolean;
  setCurrentItem?: (item: Item) => any;
  onMouseOverColor?: string;

}
function CustomLine(props: LineProps) {
  const lineRef = useRef<LineType>(null);
  const [isMouseOver, setIsMouseOver] = useState<boolean>(false);

  function snapToGrid(points: number[]): number[] {
    let startX = Math.round(points[0] / snapSize) * snapSize;
    let startY = Math.round(points[1] / snapSize) * snapSize;
    let endX = Math.round(points[2] / snapSize) * snapSize;
    let endY = Math.round(points[3] / snapSize) * snapSize;
    return [startX, startY, endX, endY];
  }

  function onClick() {
    let currentItem = mapToItem(lineRef.current?.attrs.points);
    if(props.setCurrentItem){
    props.setCurrentItem(currentItem);
    }
  }

  function mapToItem(x: number[]) {
    let item: Item = {
      position: { start: { x: x[2], y: x[1] }, end: { x: x[2], y: x[3] } },
      id: props.key
    };
    return item;
  }
  function onMouseOver() {   
   setIsMouseOver(true);
  }

  function onMouseLeave() {
setIsMouseOver(false);
  }

  return (
    <Line
      key={props.key}
      points={props.snapToGrid ? snapToGrid(props.points) : props.points}
      stroke={isMouseOver? props.onMouseOverColor : props.stroke}
      strokeWidth={params.width / 10}
      ref={lineRef}
      onClick={() => onClick()}
      onMouseOver = {() => onMouseOver()}
      onMouseLeave = {() => onMouseLeave()}
    />
  );
}

export default React.memo(CustomLine);
