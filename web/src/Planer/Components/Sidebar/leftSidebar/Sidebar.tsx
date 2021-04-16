import React, { useState } from "react";
import "./Sidebar.scss";
import SidebarAddItem from "./SidebarItems/SidebarAddItem";
import ItemProperties from "./SidebarItems/ItemProperties";
import { itemsCatalogueItems } from "../../../catalogue/ItemsCatalogueList";
import { Item } from "../../../PlanerTypes";
interface SidebarProps {
  setItem: (x: string) => any;
  selectedItem?: Item;
  onWallDelete: (id: number) => any;
  changeItem: (id: number, item: Item) => any;
}

export default function Sidebar(props: SidebarProps): JSX.Element {
  const { setItem, selectedItem, changeItem, onWallDelete } = props;
  const [collapseItems, setCollapseItems] = useState<boolean>(false);

  return (
    <div id="Sidebar">
      <div id="sidebarButton" onClick={() => setCollapseItems(!collapseItems)}>
        Items
      </div>

      {collapseItems && (
        <div id="items">
          <SidebarAddItem items={itemsCatalogueItems} setItem={setItem} />
        </div>
      )}

      {props.selectedItem && (
        <div className="itemProperties">
          <ItemProperties
            item={selectedItem!}
            onWallDelete={onWallDelete}
            changeItem={changeItem}
          />
        </div>
      )}
    </div>
  );
}
