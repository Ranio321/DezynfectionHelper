import React, { useEffect, useRef, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import PlanCanvas from "./Components/Canvas/PlanCanvas";
import OptionsSidebar from "./Components/OptionsSidebar/OptionsSidebar";
import Sidebar from "./Components/Sidebar/Sidebar";
import { itemList } from "./Components/Sidebar/SidebarItems/Items";
import { usePlaner } from "./Hooks/usePlaner";
import "./Planer.scss";
interface PlanerProps {}

export default function Planer(props: PlanerProps): JSX.Element {
  const [itemToAdd, setItemToAdd] = useState<string>("Pointer");
  const [currentItemId, setCurrentItemId] = useState<number | undefined>();
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });
  const canvasRef = useRef<HTMLDivElement>(null);
  const [planerItems, services] = usePlaner();

  function onKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    if (e.key === "Escape") {
      setItemToAdd(itemList.pointer);
      setCurrentItemId(undefined);
    }
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
  const optionsStyle = {
    maxWidth: "3%",
  };
  const sideBarStyle = {
    maxWidth: "14%",
  };
  return (
    <div onKeyDown={(e) => onKeyDown(e)}>
      <Container fluid style={cStyle}>
        <Row noGutters className="h-100">
          <Col style={sideBarStyle}>
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
              />
            </div>
          </Col>
          <Col style={optionsStyle}>
            <OptionsSidebar
              undo={services.undo}
              delete={services.deleteAll}
              newCanvas={services.newCanvas}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
}
