import { KonvaEventObject } from "konva/types/Node";
import { Stage as StageType } from "konva/types/Stage";
import { type } from "os";
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
  setWalls: (item:Walls) => any
  walls : Walls
}

export default function PlanCanvas(props: PlanerProps): JSX.Element {
  const { height, width, setWalls, walls } = props;

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

  const [clickPoints, setClickPoints] = useState<ClickPoints>(
    defaultStartPoint
  );

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
  
    var position = createWall(e);
    if (isDrawingSelected()) {
      let newWalls = Object.assign(walls);
      newWalls.walls.push(position);
      setWalls(newWalls);
    }

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

  function isDrawingSelected(): boolean {
    return props.itemToAdd === itemList.wall;
  }

  function createWall(e:KonvaEventObject<MouseEvent>)
  {
    let points:ClickPoints = clickPoints;
    let mousePosition = getPosition(e, layerRef);

    let newPoints: ClickPoints = {
      start: { x: points.start.x, y: points.start.y },
      end: { x: mousePosition.x, y: mousePosition.y },
    };
    let id: number = 0;

      if( walls.walls  && walls.walls.length > 0 )
      {
        
        id = walls.walls[walls.walls.length - 1].id!;
        id = id + 1;
      }

    let position: Item = {
      position: newPoints,
      id: id,
      type: "Wall"
    }

    return position;
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
          {isDrawingSelected() && (
            <CustomCircle
              x={currentMousePosition.x}
              y={currentMousePosition.y}
              radius={10}
              fill="black"
            />
          )}
          {walls?.walls.map((item, index) => {
            return (
              <CustomLine
                uniqueId={item.id}
                type = {item.type}
                points={[item.position?.start.x , item.position?.start.y, item.position?.end.x, item.position?.end.y]}
                stroke="black"
                snapToGrid
                onMouseOverColor = {isDrawingSelected()? "black" : "green"}
                setCurrentItem = {!isDrawingSelected()? props.setCurrentItem: undefined}
              />
            );
          })}
          {isDrawing && isDrawingSelected() && (
            <CustomLine
              snapToGrid
              uniqueId={-1}
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

//export default React.memo(PlanCanvas);

function getPosition(e: any, layerRef: any) {
  var transform = layerRef.current.getAbsoluteTransform().copy();
  transform.invert();

  const pos = e.target.getStage().getPointerPosition();

  var circlePos = transform.point(pos);
  var points = { x: circlePos.x, y: circlePos.y };
  return points;
}
