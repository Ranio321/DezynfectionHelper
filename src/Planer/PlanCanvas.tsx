import { KonvaEventObject } from "konva/types/Node";
import { Stage as StageType } from "konva/types/Stage";
import React, { useEffect, useRef, useState } from "react";
import { Layer, Line, Stage, Text } from "react-konva";
import CustomCircle from "./Components/Circles/CustomCircle";
import Grid from "./Components/Grid/Grid";
import CustomLine from "./Components/Lines/CustomLine";
import { itemList } from "./Components/Sidebar/SidebarItems/Items";
import { ClickPoints, DrawingLine, Item, Walls } from "./pointsModels";
interface PlanerProps {
  width: number;
  height: number;
  itemToAdd: string;
  setCurrentItem: (item: Item) => any;
}

export default function PlanCanvas(props: PlanerProps): JSX.Element {
  const { height, width } = props;

  const defaultStartPoint = {
    start: { x: 0, y: 0 },
    end: { x: 0, y: 0 },
  };
  const [isDrawing, setIsDrawing] = useState<Boolean>(false);
  const [currentMousePosition, setCurrentMousePosition] = useState({
    x: 0,
    y: 0,
  });
  const [drawingLine, setDrawingLine] = useState<DrawingLine>({
    end: { x: 0, y: 0 },
    start: { x: 0, y: 0 },
  });
  const [lines, setLines] = useState<Walls>({ walls: [] });
  const [, setCounter] = useState(0);

  const [clickPoints, setClickPoints] = useState<ClickPoints>(
    defaultStartPoint
  );
  const [lineColor, setLineColor] = useState<string>("black");

  const layerRef = useRef<StageType>(null);

  function onMouseDown(e: KonvaEventObject<MouseEvent>) {
    setIsDrawing(true);
    let points = clickPoints;
    let mousePosition = getPosition(e, layerRef);
    let position = { x: mousePosition.x, y: mousePosition.y };
    setDrawingLine({ start: position, end: position });
    points.start = position;
    setClickPoints(points);
  }
  function onMouseUp(e: KonvaEventObject<MouseEvent>) {
    let points = clickPoints;
    let mousePosition = getPosition(e, layerRef);
    let position = { x: mousePosition.x, y: mousePosition.y };

    let newPoints: ClickPoints = {
      start: { x: points.start.x, y: points.start.y },
      end: { x: position.x, y: position.y },
    };
    if (shouldDrawLine()) {
      let walls = lines;
      walls.walls.push(newPoints);
      setLines(walls);
    }
    setCounter(1);
    setIsDrawing(false);
  }

  function onMouseMove(e: KonvaEventObject<MouseEvent>) {
    let mousePosition = getPosition(e, layerRef);
    let position = { x: mousePosition.x, y: mousePosition.y };
    let newPoints: ClickPoints = {
      start: { x: drawingLine.start.x, y: drawingLine.start.y },
      end: { x: position.x, y: position.y },
    };
    setCurrentMousePosition({ x: mousePosition.x, y: mousePosition.y });
    setDrawingLine(newPoints);
  }

  function shouldDrawLine(): boolean {
    return props.itemToAdd == itemList.wall;
  }

  return (
    <div id="planer">
      <Stage
        width={width}
        height={height}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onMouseMove={onMouseMove}
        ref={layerRef}
      >
        <Grid width={width} height={height} />
        <Layer>
          {shouldDrawLine() && (
            <CustomCircle
              x={currentMousePosition.x}
              y={currentMousePosition.y}
              radius={10}
              fill="black"
            />
          )}
          {lines?.walls.map((item, index) => {
            return (
              <CustomLine
                key={index}
                points={[item.start.x, item.start.y, item.end.x, item.end.y]}
                stroke={lineColor}
                snapToGrid
                onMouseOverColor = "green"
              />
            );
          })}
          {isDrawing && shouldDrawLine() && (
            <CustomLine
              snapToGrid
              key="drawingLine"
              points={[
                drawingLine.start.x,
                drawingLine.start.y,
                drawingLine.end.x,
                drawingLine.end.y,
              ]}
              stroke="blue"
            />
          )}
        </Layer>
      </Stage>
    </div>
  );
}

function getPosition(e: any, layerRef: any) {
  var transform = layerRef.current.getAbsoluteTransform().copy();
  // to detect relative position we need to invert transform
  transform.invert();
  // now we find relative point

  const pos = e.target.getStage().getPointerPosition();

  var circlePos = transform.point(pos);
  var points = { x: circlePos.x, y: circlePos.y };
  return points;
}
