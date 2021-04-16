import React, { useEffect, useRef, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { PlanerItemsDto } from "../api/models";
import { planerService } from "../api/planerServices";
import PlanCanvas from "./components/canvas/PlanCanvas";
import OptionsSidebar from "./components/sidebar/rightSidebar/RightSidebar";
import { itemList } from "./components/sidebar/leftSidebar/SidebarItems/Items";
import { cloneObject } from "./utils/cloneObject";
import { useDataLoader } from "./hooks/useDataLoader";
import { usePlaner } from "./hooks/usePlaner";
import useRightMouseClick from "./hooks/useRightMouseClick";
import { planerItemsToParams } from "./mappers/planerItemsToParams";
import "./Planer.scss";
import { PlanerItems, Room } from "./PlanerTypes";
import Sidebar from "./components/sidebar/leftSidebar/Sidebar";
interface PlanerProps {}

export default function Planer(props: PlanerProps): JSX.Element {
  const { id } = useParams<{ id: string }>();
  const [initialItems] = useDataLoader(() => planerService.get(parseInt(id)));
  const [itemToAdd, setItemToAdd] = useState<string>("Pointer");
  const [currentItemId, setCurrentItemId] = useState<number | undefined>();
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });
  const canvasRef = useRef<HTMLDivElement>(null);
  const [planerItems, services] = usePlaner(
    planerItemsDtoToPlanerItems(initialItems)
  );

  useRightMouseClick(() => {
    setDefaultCursor();
    deleteHightlight();
  });

  function onKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    if (e.key === "Escape") {
      setDefaultCursor();
      deleteHightlight();
    }
    if (e.key === "Delete" && currentItemId) {
      services.deleteItem(currentItemId);
      setDefaultCursor();
      deleteHightlight();
    }
  }
  function onSave(name: string): Promise<PlanerItems> {
    let params = cloneObject(planerItems);
    if (name.length > 0) {
      params.name = name;
    }
    let data = planerItemsToParams(params);
    let response = planerService.save(data);
    return response;
  }

  useEffect(() => {
    deleteHightlight();
  }, [itemToAdd, planerItems.items.length]);

  useEffect(() => {
    function handleResize() {
      let size;
      if (canvasRef.current && canvasRef) {
        size = {
          width: canvasRef.current.offsetWidth,
          height: canvasRef.current.offsetHeight,
        };
        setCanvasSize({ ...size });
      }
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  function setDefaultCursor() {
    setItemToAdd(itemList.pointer);
  }

  function deleteHightlight() {
    setCurrentItemId(undefined);
  }

  const cStyle = {
    height: window.innerHeight,
    padding: "0px",
    margin: "0px",
  };
  const colStyle = {
    height: window.innerHeight,
    maxWidth: "83%",
    minWidth: "83%",
  };
  return (
    <div className="planer" onKeyDown={onKeyDown}>
      <Container fluid style={cStyle}>
        <Row noGutters className="h-100">
          <Col style={{ maxWidth: "14%" }}>
            <Sidebar
              setItem={setItemToAdd}
              selectedItem={services.getItem(currentItemId)}
              onWallDelete={services.deleteItem}
              changeItem={services.changeItem}
            />
          </Col>
          <Col ref={canvasRef} style={colStyle}>
            <div tabIndex={0}>
              <PlanCanvas
                width={canvasSize.width}
                height={canvasSize.height}
                itemToAdd={itemToAdd}
                setCurrentItemId={setCurrentItemId}
                allItems={planerItems.items}
                currentItemId={currentItemId}
                addItem={services.addItem}
                rooms={planerItems.rooms}
                changeItem={services.changeItem}
              />
            </div>
          </Col>
          <Col style={{ maxWidth: "3%" }}>
            <OptionsSidebar
              onUndo={services.undo}
              onDelete={services.deleteAll}
              onNewCanvas={services.newCanvas}
              onSave={onSave}
              changeName={planerItems.name === undefined}
              onUpdate={() =>
                planerService.update(
                  planerItemsToParams(planerItems, parseInt(id))
                )
              }
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

function planerItemsDtoToPlanerItems(
  planerItemsDto?: PlanerItemsDto
): PlanerItems | undefined {
  if (planerItemsDto) {
    let obj: PlanerItemsDto = planerItemsDto;
    const rooms: Room[] = [];
    if (obj.room) {
      rooms.push(obj.room);
    }
    let newObj: PlanerItems = {
      name: obj.name,
      items: obj.objects,
      rooms: rooms,
    };
    return newObj;
  }
}
