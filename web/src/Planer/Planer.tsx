import React, { useEffect, useRef, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { PlanerItemsDto } from "../api/models";
import { planerService } from "../api/PlanerServices";
import PlanCanvas from "./Components/Canvas/PlanCanvas";
import OptionsSidebar from "./Components/OptionsSidebar/OptionsSidebar";
import Sidebar from "./Components/Sidebar/Sidebar";
import { itemList } from "./Components/Sidebar/SidebarItems/Items";
import { cloneObject } from "./Helpers/cloneObject";
import { useDataLoader } from "./Hooks/useDataLoader";
import { usePlaner } from "./Hooks/usePlaner";
import { planerItemsToParams } from "./Mappers/planerItemsToParams";
import "./Planer.scss";
import { PlanerItems, Room } from "./PlanerTypes";
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

  function onKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    if (e.key === "Escape") {
      setItemToAdd(itemList.pointer);
      setCurrentItemId(undefined);
    }
    if (e.key === "Delete") {
      if (currentItemId) {
        services.deleteItem(currentItemId);
        setItemToAdd(itemList.pointer);
        setCurrentItemId(undefined);
      }
    }
  }
  function onSave(name: string) {
    let params = cloneObject(planerItems);
    if (name.length > 0) {
      params.name = name;
    }
    let data = planerItemsToParams(params);
    let response = planerService.save(data);
    return response;
  }

  useEffect(() => {
    setCurrentItemId(undefined);
  }, [itemToAdd]);

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
  }, []);

  useEffect(() => {
    setCurrentItemId(undefined);
  }, [planerItems.items.length]);

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
    <div onKeyDown={(e) => onKeyDown(e)}>
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
              undo={services.undo}
              delete={services.deleteAll}
              newCanvas={services.newCanvas}
              save={onSave}
              changeName={planerItems.name === undefined}
              update={() =>
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
