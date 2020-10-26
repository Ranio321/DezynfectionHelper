import { KonvaEventObject } from "konva/types/Node";
import { Stage as StageType } from "konva/types/Stage";
import React, { useRef, useState } from "react";
import { Layer, Stage } from "react-konva";
import { getMousePosition } from "../../Helpers/mousePosition";
import { ClickPoints, DrawingLine, Item, Walls } from "../../PlanerTypes";
import Grid from "../Grid/Grid";
import CustomLine from "../Lines/CustomLine";
import MousePointerItem from "../MousePointer/MousePointerItem";
import { PointerType } from "../MousePointer/PointerType";
import { itemList } from "../Sidebar/SidebarItems/Items";
import "./PlanCanvas.scss";
interface PlanerProps {
  width: number;
  height: number;
  itemToAdd: string;
  setCurrentItem: (item: Item) => any;
  setWalls: (item: Walls) => any;
  walls: Walls;
  currentItemId?: number;
}

export default function PlanCanvas(props: PlanerProps): JSX.Element {
  const { height, width, setWalls, walls } = props;

  const defaultStartPoint = {
    start: { x: 0, y: 0 },
    end: { x: 0, y: 0 },
  };
  const [isDrawing, setIsDrawing] = useState<Boolean>(false);
  const [currentMousePosition, setCurrentMousePosition] = useState(
    defaultStartPoint.start
  );
  const [drawingLine, setDrawingLine] = useState<DrawingLine>(
    defaultStartPoint
  );

  const [clickPoints, setClickPoints] = useState<ClickPoints>(
    defaultStartPoint
  );

  const layerRef = useRef<StageType>(null);

  function onMouseDown(e: KonvaEventObject<MouseEvent>) {
    setIsDrawing(true);
    let points = clickPoints;
    let mousePosition = currentMousePosition;
    let position = { x: mousePosition.x, y: mousePosition.y };
    points.start = position;

    setClickPoints(points);
    setDrawingLine({ start: position, end: position });
  }

  function onMouseUp(e: KonvaEventObject<MouseEvent>) {
    var position = createWall();

    if (isDrawingSelected()) {
      let newWalls = {...walls};
      newWalls.walls.push(position);
      setWalls({...newWalls});
    }

    setIsDrawing(false);
  }

  function onMouseMove(e: KonvaEventObject<MouseEvent>) {
    let mousePosition = getMousePosition(e, layerRef);
    let position = { x: mousePosition.x, y: mousePosition.y };
    let newPoints: ClickPoints = {
      start: { x: drawingLine.start.x, y: drawingLine.start.y },
      end: { x: position.x, y: position.y },
    };
    setCurrentMousePosition(mousePosition);
    setDrawingLine(newPoints);
  }

  function isDrawingSelected(): boolean {
    return props.itemToAdd === itemList.wall;
  }

  function createWall() {
    let points: ClickPoints = clickPoints;
    let mousePosition = currentMousePosition;

    let newPoints: ClickPoints = {
      start: { x: points.start.x, y: points.start.y },
      end: { x: mousePosition.x, y: mousePosition.y },
    };
    let id: number = 0;

    if (walls.walls && walls.walls.length > 0) {
      id = walls.walls[walls.walls.length - 1].id!;
      id = id + 1;
    }

    let item: Item = {
      position: newPoints,
      id: id,
      type: "Wall",
    };

    return item;
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
          <MousePointerItem mousePosition = {currentMousePosition} mouseItem = {props.itemToAdd}/>
          {walls?.walls.map((item) => {
            return (
              <CustomLine
                uniqueId={item.id}
                type={item.type}
                points={[
                  item.position?.start!.x,
                  item.position?.start!.y,
                  item.position?.end!.x,
                  item.position?.end!.y,
                ]}
                stroke={props.currentItemId === item.id ? "green" : "black"}
                snapToGrid
                onMouseOverColor={isDrawingSelected() ? "black" : "green"}
                setCurrentItem={
                  !isDrawingSelected() ? props.setCurrentItem : undefined
                }
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



