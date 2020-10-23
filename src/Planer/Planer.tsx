import React, { Ref, useEffect, useRef, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import OptionsSidebar from "./Components/OptionsSidebar/OptionsSidebar";
import Sidebar from "./Components/Sidebar/Sidebar";
import { itemList } from "./Components/Sidebar/SidebarItems/Items";
import PlanCanvas from "./PlanCanvas";
import { Item, Walls } from "./pointsModels";
interface PlanerProps {
}

export default function Planer(props: PlanerProps): JSX.Element {
  const [itemToAdd, setItemToAdd] = useState<string>("");
  const [currentItem, setCurrentItem] = useState<Item | undefined>();
  const [walls, setWalls] = useState<Walls>({ walls: [] });
  const [canvasSize, setCanvasSize] = useState({width: 0, height: 0});
  const canvasRef = useRef<HTMLDivElement>(null);

  function onKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    if (e.key === "Escape") {
      setItemToAdd(itemList.pointer);
    }
  }

  function onWallDelete(id: number) {
    if (walls) {
      let newWalls: Walls = Object.assign(walls);
      newWalls.walls = newWalls.walls.filter((item) => {
        return item.id !== id;
      });
      setCurrentItem(undefined);
      setWalls(newWalls);
    }
  }

  function deleteAllWalls() {
    setWalls({walls:[]});
  }

  function undo(){
    let newWalls : Walls  = Object.assign(walls);
    newWalls.walls.pop();
    setWalls(newWalls);
  }

  useEffect(() => {
    if (itemToAdd !== itemList.pointer) {
      setCurrentItem(undefined);
    }
  }, [itemToAdd]);

  useEffect(() => {
    let size;
    if(canvasRef.current && canvasRef)
    {
    size = {width: canvasRef.current.offsetWidth, height: canvasRef.current.offsetHeight};
    setCanvasSize(size);
    }
  },[window.innerWidth, window.innerHeight])


  return (
    <Container fluid>
      <Row noGutters>
        <Col lg="2">
          <Sidebar
            setItem={setItemToAdd}
            selectedItem={currentItem}
            onWallDelete={onWallDelete}
          />
        </Col>
        <Col lg="9" ref = {canvasRef}>
          <div tabIndex={0} onKeyDown={(e) => onKeyDown(e)}>
            <PlanCanvas
              width={canvasSize.width}
              height={canvasSize.height}
              itemToAdd={itemToAdd}
              setCurrentItem={setCurrentItem}
              setWalls={setWalls}
              walls={walls!}
              currentItemId={currentItem?.id}
            />
          </div>
        </Col>
        <Col md="1">
          <OptionsSidebar undo = {undo} delete = {deleteAllWalls}/>
        </Col>
      </Row>
    </Container>
  );
}
