import React, { Ref, useEffect, useRef, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import PlanCanvas from "./Components/Canvas/PlanCanvas";
import OptionsSidebar from "./Components/OptionsSidebar/OptionsSidebar";
import Sidebar from "./Components/Sidebar/Sidebar";
import { itemList } from "./Components/Sidebar/SidebarItems/Items";
import { usePlaner } from "./Hooks/usePlaner";
import { Item} from "./PlanerTypes";
interface PlanerProps {
}

export default function Planer(props: PlanerProps): JSX.Element {
  const [itemToAdd, setItemToAdd] = useState<string>("");
  const [currentItemId, setCurrentItemId] = useState<number | undefined>();
  const [canvasSize, setCanvasSize] = useState({width: 0, height: 0});
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
    let size;
    if(canvasRef.current && canvasRef)
    {
    size = {width: canvasRef.current.offsetWidth, height: canvasRef.current.offsetHeight};
    setCanvasSize({...size});
    }
  },[window.innerWidth, window.innerHeight])

  useEffect(()=>{
    setCurrentItemId(undefined);
  },[planerItems])

  return (
    <Container fluid>
      <Row noGutters>
        <Col lg="2">
          <Sidebar
            setItem={setItemToAdd}
            selectedItem={services.getItem(currentItemId)}
            onWallDelete={services.deleteItem}
          />
        </Col>
        <Col lg="9" ref = {canvasRef}>
          <div tabIndex={0} onKeyDown={(e) => onKeyDown(e)}>
            <PlanCanvas
              width={canvasSize.width}
              height={canvasSize.height}
              itemToAdd={itemToAdd}
              setCurrentItemId={setCurrentItemId}
              allItems={planerItems.items}
              currentItemId={currentItemId}
              addItem = {services.addItem}
            />
          </div>
        </Col>
        <Col md="1">
          <OptionsSidebar undo = {services.deleteLast} delete = {services.deleteAll}/>
        </Col>
      </Row>
    </Container>
  );
}
