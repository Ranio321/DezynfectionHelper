import { KonvaEventObject } from "konva/types/Node";
import { Stage as StageType } from "konva/types/Stage";
import React, { useRef, useState } from "react";
import { Layer, Stage } from "react-konva";
import { getMousePosition } from "../../Helpers/mousePosition";
import {
  ClickPoints,
  DrawingLine,
  Item,
  Point,
  Room as RoomType,
} from "../../PlanerTypes";
import Grid from "../Grid/Grid";
import CustomLine from "../Lines/CustomLine";
import MousePointerItem from "../MousePointer/MousePointerItem";
import { itemList } from "../Sidebar/SidebarItems/Items";
import "./PlanCanvas.scss";
import PlanerItems from "../Items/PlanerItems";
import { itemFactory } from "../../Helpers/planerItemsServices";
import { lampParams } from "../Items/Constants/LampConstants";
import { Col, Container, Row } from "react-bootstrap";
import LeftGridScale from "../Grid/LeftGridScale";
import TopGridScale from "../Grid/TopGridScale";
import Room from "../Items/Room";
import Konva from "konva";
interface PlanerProps {
  width: number;
  height: number;
  itemToAdd: string;
  setCurrentItemId: (id: number) => any;
  allItems: Item[];
  rooms?: RoomType[];
  currentItemId?: number;
  addItem: (item: Item) => any;
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

  function onMouseUp() {
    let item = createItem();
    if (shouldAddItem() && item) {
      addItem(item);
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
  const rowStyle = {
    height: "20px",
  };

  const colStyle = {
    maxWidth: "20px",
    margin: "0px",
    paddingRight: "0px",
  };

  const cStyle = {
    padding: "0px",
    margin: "0px",
    maxWidth: width,
  };

  return (
    <Container style={cStyle}>
      <Row style={rowStyle} noGutters>
        <Col>
          <TopGridScale width={width - 20} />
        </Col>
      </Row>
      <Row noGutters>
        <Col style={colStyle}>
          <LeftGridScale height={height - 20} />
        </Col>
        <Col className="planer">
          <div id="planer">
            <Stage
              filters={[Konva.Filters.Blur]}
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
