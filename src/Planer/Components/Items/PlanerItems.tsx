import React, { useEffect, useState } from "react";
import { ClickPoints, Item, Items, MousePosition } from "../../PlanerTypes";
import { itemList } from "../Sidebar/SidebarItems/Items";
import Lamp from "./Lamp";
import Wall from "./Wall";
interface ItemsProps {
  items: Items[];
  snapToGrid: boolean;
  setCurrentItemId: (id: number) => any;
  currentItemId?: number;
  itemToAdd: string;
}
 function PlanerItems(props: ItemsProps): JSX.Element {
  const { items, snapToGrid, setCurrentItemId, currentItemId, itemToAdd } = props;
  const [rectItems, setRectItmes] = useState<Items[]>();
  const [walls, setWalls] = useState<Items[]>();

  useEffect(() => {
    let walls: Items[] =[];
    let rectItems:Items[] = [];
    items.forEach(item => {
      if( item.item  && item.item.type === itemList.wall)
      {
        walls.push(item);
      }
      if (
        item.item &&
        item.item.id &&
        item.item.type === itemList.lamp &&
        item.item.position.width &&
        item.item.position.height
      ) {
        rectItems.push(item);
      }
      setRectItmes(rectItems);
      setWalls(walls);

  
    })
    
    
  },[items.length]);

  function shouldHighlight() {
    return itemToAdd === itemList.pointer;
  }

  function Walls() {
    const walls: any = []; 
    items.forEach((item) => {
      if (item.item  && item.item.type === itemList.wall) {
        let position: ClickPoints = {
          end: { ...item.item.position.end! },
          start: { ...item.item.position.start! },
        };

        walls.push(
          <Wall
            key={item.item.id}
            id={item.item.id}
            type={item.item.type}
            onMouseOverColor={shouldHighlight() ? "red" : "black"}
            position={position}
            stroke= "black"
            currentItemId = {currentItemId}
            setCurrentItemId = {setCurrentItemId}
            shouldSetItem = {shouldHighlight()}
          />
        );
      }
    });
    return walls;
  }

  function Lamps() {
    const lamps: any = [];
    items.forEach((item) => {
      if (
        item.item &&
        item.item.id &&
        item.item.type === itemList.lamp &&
        item.item.position.width &&
        item.item.position.height
      ) {
        let position: MousePosition = { ...item.item.position.start! };
        lamps.push(
          <Lamp
            key ={item.item.id}
            id={item.item.id}
            mousePosition={position}
            width={item.item.position.width}
            height={item.item.position.height}
            showBlur = {itemToAdd === itemList.pointer && currentItemId !== item.item.id}
            currentItemId= {currentItemId}
            onClickBlur = { itemToAdd === itemList.pointer}
            setCurrentItemId = {setCurrentItemId}
            shouldSetItem = {shouldHighlight()}
            
          />
        );
      }
    });
    return lamps;
  }


  return <>{Walls()}{Lamps()}</>;
}

//export default PlanerItems;
export default React.memo(PlanerItems,(prevProps,nextProps)=>{
    return prevProps.items.length === nextProps.items.length && prevProps.itemToAdd === nextProps.itemToAdd && prevProps.currentItemId === nextProps.currentItemId;
 });