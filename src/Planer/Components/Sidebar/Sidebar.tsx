import React, { useState } from "react";
import { items } from "./Items";
import "./Sidebar.scss";
import SidebarItem from "./SidebarItem";
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
            {collapseItems && <SidebarItem items = {items} setItem ={props.setItem}/>}
        </div>
    </div>
  );
}
