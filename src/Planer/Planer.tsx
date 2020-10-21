import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Sidebar from "./Components/Sidebar/Sidebar";
import { itemList } from "./Components/Sidebar/SidebarItems/Items";
import PlanCanvas from "./PlanCanvas";
import { Item } from "./pointsModels";
interface PlanerProps {}

export default function Planer(props: PlanerProps): JSX.Element {

    const [itemToAdd, setItemToAdd] = useState<string>("");
    const [currentItem, setCurrentItem] = useState<Item>()

    function onKeyDown(e: React.KeyboardEvent<HTMLDivElement>)
    {
      if(e.key === "Escape")
      {
        setItemToAdd(itemList.pointer);
      }
    }
  return (
    <Container fluid>
      <Row noGutters>
        <Col> 
        <Sidebar setItem = {setItemToAdd}/>
        </Col>
        <Col>
        <div tabIndex={0} onKeyDown= {(e) => onKeyDown(e)}>
          <PlanCanvas width={1000} height={800} itemToAdd = {itemToAdd} setCurrentItem = {setCurrentItem}/>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
