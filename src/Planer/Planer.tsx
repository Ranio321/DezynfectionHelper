import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Sidebar from "./Components/Sidebar/Sidebar";
import { itemList } from "./Components/Sidebar/SidebarItems/Items";
import PlanCanvas from "./PlanCanvas";
import { Item, Walls } from "./pointsModels";
interface PlanerProps {}

export default function Planer(props: PlanerProps): JSX.Element {

    const [itemToAdd, setItemToAdd] = useState<string>("");
    const [currentItem, setCurrentItem] = useState<Item | undefined>()
    const [walls, setWalls] = useState<Walls>({walls:[]});    


    function onKeyDown(e: React.KeyboardEvent<HTMLDivElement>)
    {
      if(e.key === "Escape")
      {
        setItemToAdd(itemList.pointer);
      }
    }

    function onWallDelete(id: number)
    {
      if(walls){
      let newWalls:Walls = Object.assign(walls)
      newWalls.walls = newWalls.walls.filter((item) => {
        return item.id !== id;
      })
      setCurrentItem(undefined);
      setWalls(newWalls);
    }
    }
useEffect(()=>{
console.log("render")
},[itemToAdd]);

  return (
    <Container fluid>
      <Row noGutters>
        <Col> 
        <Sidebar setItem = {setItemToAdd} selectedItem = {currentItem} onWallDelete = {onWallDelete}/>
        </Col>
        <Col>
        <div tabIndex={0} onKeyDown= {(e) => onKeyDown(e)}>
          <PlanCanvas width={1000} height={800} itemToAdd = {itemToAdd} setCurrentItem = {setCurrentItem} setWalls = {setWalls} walls = {walls!}/>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
