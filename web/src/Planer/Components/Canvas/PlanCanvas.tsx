import { Stage as StageType } from "konva/types/Stage";
import React, { useRef, useState } from "react";
import { Layer, Stage } from "react-konva";
import { getMousePosition } from "../../utils/mousePosition";
import {
  ClickPoints,
  DrawingLine,
  Item,
  Point,
  Room as RoomType,
} from "../../PlanerTypes";
import Grid from "../grid/Grid";
import CustomLine from "../lines/CustomLine";
import MousePointerItem from "../cursor/MousePointerItem";
import { itemList } from "../sidebar/leftSidebar/SidebarItems/Items";
import "./PlanCanvas.scss";
import PlanerItems from "../items/PlanerItems";
import { itemFactory } from "../../utils/planerItemsServices";
import { lampParams } from "../items/Constants/LampConstants";
import { Col, Container, Row } from "react-bootstrap";
import LeftGridScale from "../grid/LeftGridScale";
import TopGridScale from "../grid/TopGridScale";
import Room from "../items/Room";
import { cloneObject } from "../../utils/cloneObject";
import { KonvaEventObject } from "konva/types/Node";
interface PlanerProps {
  width: number;
  height: number;
  itemToAdd: string;
  setCurrentItemId: (id: number) => any;
  allItems: Item[];
  rooms?: RoomType[];
  currentItemId?: number;
  addItem: (item: Item) => any;
  changeItem: (id: number, item: Item) => any;
}

export default function PlanCanvas(props: PlanerProps): JSX.Element {
  const {
    height,
    width,
    allItems,
    itemToAdd,
    setCurrentItemId,
    currentItemId,
    addItem,
    rooms,
  } = props;

  const defaultStartPoint = {
    start: { x: 0, y: 0 },
    end: { x: 0, y: 0 },
  };
  const [isDrawing, setIsDrawing] = useState<Boolean>(false);
  const [showPointer, setShowPointer] = useState<Boolean>(true);
  const [currentMousePosition, setCurrentMousePosition] = useState(
    defaultStartPoint.start
  );
  const [drawingLine, setDrawingLine] = useState<DrawingLine>(
    defaultStartPoint
  );

  const [mouseDownPoints, setMouseDownPoints] = useState<Point>({ x: 0, y: 0 });

  const layerRef = useRef<StageType>(null);

  function onMouseDown() {
    setIsDrawing(true);
    let points = mouseDownPoints;
    let mousePosition = currentMousePosition;
    let position = { x: mousePosition.x, y: mousePosition.y };
    points = position;

    setMouseDownPoints({ ...points });
    setDrawingLine({ start: position, end: position });
  }

  function onMouseUp(e: KonvaEventObject<MouseEvent>) {
    if (e.evt.button === 0) {
      let item = createItem();
      if (shouldAddItem() && item) {
        addItem(item);
      }
      setIsDrawing(false);
    }
  }

  function onMouseMove() {
    let mousePosition = getMousePosition(layerRef);
    let position = { x: mousePosition.x, y: mousePosition.y };
    let newPoints: ClickPoints = {
      start: { x: drawingLine.start.x, y: drawingLine.start.y },
      end: { x: position.x, y: position.y },
    };
    setCurrentMousePosition(mousePosition);
    setDrawingLine(newPoints);
  }

  function isDrawingSelected(): boolean {
    return itemToAdd === itemList.wall;
  }
  function shouldAddItem(): boolean {
    return itemToAdd !== itemList.pointer;
  }

  function createItem() {
    let item;

    switch (itemToAdd) {
      case itemList.wall:
        item = itemFactory.createWall(mouseDownPoints, currentMousePosition);
        break;

      case itemList.pointer:
        break;

      default:
        item = itemFactory.createLamp(
          currentMousePosition,
          lampParams.width,
          lampParams.height,
          itemToAdd
        );
        break;
    }
    return item;
  }

  function onObjectDragEnd(id: number, item: Item) {
    let newItem = cloneObject(item);
    newItem.position.start = getMousePosition(layerRef);
    props.changeItem(id, newItem);
  }

  const cStyle = {
    padding: "0px",
    margin: "0px",
    maxWidth: width,
  };

  return (
    <Container style={cStyle}>
      <Row style={{ height: "20px" }} noGutters>
        <Col>
          <TopGridScale width={width - 20} />
        </Col>
      </Row>
      <Row noGutters>
        <Col className="planerCol">
          <LeftGridScale height={height - 20} />
        </Col>
        <Col className="planerCol">
          <div id="planer">
            <Stage
              width={width - 20}
              height={height - 20}
              onMouseDown={onMouseDown}
              onMouseUp={onMouseUp}
              onMouseMove={onMouseMove}
              onMouseLeave={() => setShowPointer(false)}
              onMouseEnter={() => setShowPointer(true)}
              ref={layerRef}
            >
              <Grid width={width} height={height} />
              <Layer>
                {showPointer && (
                  <MousePointerItem
                    mousePosition={currentMousePosition}
                    mouseItem={itemToAdd}
                  />
                )}
                <PlanerItems
                  items={allItems}
                  snapToGrid
                  setCurrentItemId={setCurrentItemId}
                  itemToAdd={itemToAdd}
                  currentItemId={currentItemId}
                  onLampDragEnd={(id, item) => onObjectDragEnd(id, item)}
                />
                {rooms?.map((room) => (
                  <Room key={room.name} room={room} />
                ))}
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
        </Col>
      </Row>
    </Container>
  );
}
