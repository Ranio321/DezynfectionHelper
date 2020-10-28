import React, { useState } from "react";
import "./Sidebar.scss";
import SidebarAddItem from "./SidebarItems/SidebarAddItem";
import ItemProperties from "./SidebarItems/ItemProperties";
import { Item } from "../../PlanerTypes";
import { itemsCatalogueItems } from "../../ItemsCatalogue/ItemsCatalogueList";
interface SidebarProps {
  setItem: (x: string) => any;
  selectedItem?: Item;
  onWallDelete: (id: number) => any;
}

export default function Sidebar(props: SidebarProps): JSX.Element {
  const [collapseItems, setCollapseItems] = useState<boolean>(false);

  return (
    <div id="Sidebar">
      <div id="sidebarButton" onClick={() => setCollapseItems(!collapseItems)}>
        Items
      </div>
      <div id="items">
        {collapseItems && (
          <SidebarAddItem items={itemsCatalogueItems} setItem={props.setItem} />
        )}
      </div>
      {props.selectedItem && (
        <div className="itemProperties">
          <ItemProperties
            item={props.selectedItem}
            onWallDelete={props.onWallDelete}
          />
        </div>
      )}
    </div>
  );
}
