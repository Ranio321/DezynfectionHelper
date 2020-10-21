import React, { useState } from "react";
import { items } from "./SidebarItems/Items";
import "./Sidebar.scss";
import SidebarAddItem from "./SidebarItems/SidebarAddItem";
interface SidebarProps {
    setItem: (x: string)=> any
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
    </div>
  );
}
