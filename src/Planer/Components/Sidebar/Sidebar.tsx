import React, { useState } from "react";
import { items } from "./SidebarItems/Items";
import "./Sidebar.scss";
import SidebarAddItem from "./SidebarItems/SidebarAddItem";
import ItemProperties from "./SidebarItems/ItemProperties";
import { Item } from "../../pointsModels";
interface SidebarProps {
    setItem: (x: string)=> any
    selectedItem?: Item
    onWallDelete: (id: number) => any
}

export default function Sidebar(props: SidebarProps): JSX.Element {

    const [collapseItems, setCollapseItems] = useState<boolean>(false);

  return (
    <div id="Sidebar">
      <div
        id = "sidebarButton"
        onClick={()=>setCollapseItems(!collapseItems)}
      > Items</div>
        <div id="items">
            {collapseItems && <SidebarAddItem items = {items} setItem ={props.setItem}/>}
        </div>
        {props.selectedItem 
          &&
         <ItemProperties item = {props.selectedItem} onWallDelete = {props.onWallDelete}/>}
        
    </div>
  );
}
