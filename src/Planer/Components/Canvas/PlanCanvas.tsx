import { KonvaEventObject } from "konva/types/Node";
import { Stage as StageType } from "konva/types/Stage";
import React, { useRef, useState } from "react";
import { Layer, Stage } from "react-konva";
import { getMousePosition } from "../../Helpers/mousePosition";
import { ClickPoints, DrawingLine, Items, Point } from "../../PlanerTypes";
import Grid from "../Grid/Grid";
import CustomLine from "../Lines/CustomLine";
import MousePointerItem from "../MousePointer/MousePointerItem";
import { itemList } from "../Sidebar/SidebarItems/Items";
import "./PlanCanvas.scss";
import PlanerItems from "../Items/PlanerItems";
import { itemFactory } from "../../Helpers/planerItemsServices";
import { lampParams } from "../Items/Constants/LampConstants";
interface PlanerProps {
  width: number;
  height: number;
  itemToAdd: string;
  setCurrentItemId: (id: number) => any;
  allItems: Items[];
  currentItemId?: number;
  addItem: (id: Items) => any;
}

export default function PlanCanvas(props: PlanerProps): JSX.Element {
  const { height, width, allItems } = props;

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

  const [mouseDownPoints, setMouseDownPoints] = useState<Point>({ x: 0, y: 0 });

  const layerRef = useRef<StageType>(null);

  function onMouseDown(e: KonvaEventObject<MouseEvent>) {
    setIsDrawing(true);
    let points = mouseDownPoints;
    let mousePosition = currentMousePosition;
    let position = { x: mousePosition.x, y: mousePosition.y };
    points = position;

    setMouseDownPoints({ ...points });
    setDrawingLine({ start: position, end: position });
  }

  function onMouseUp(e: KonvaEventObject<MouseEvent>) {
    let item = createItem();
    if (shouldAddItem() && item) {
      props.addItem({ item });
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
  function shouldAddItem(): boolean {
    return props.itemToAdd !== itemList.pointer;
  }

  function createItem() {
    let item;

    switch (props.itemToAdd) {
      case itemList.wall:
        item = itemFactory.createWall(mouseDownPoints, currentMousePosition);
        break;

      case itemList.lamp:
        item = itemFactory.createLamp(
          currentMousePosition,
          lampParams.width,
          lampParams.height
        );

        break;
    }
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
          <MousePointerItem
            mousePosition={currentMousePosition}
            mouseItem={props.itemToAdd}
          />
          <PlanerItems
            items={allItems}
            snapToGrid
            setCurrentItemId={props.setCurrentItemId}
            itemToAdd={props.itemToAdd}
            currentItemId={props.currentItemId}
          />
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
