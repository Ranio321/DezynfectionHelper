import React, { useEffect, useState } from "react";
import { itemsCatalogueItems } from "../../ItemsCatalogue/ItemsCatalogueList";
import { Item } from "../../PlanerTypes";
import { itemList } from "../Sidebar/SidebarItems/Items";
import Lamp from "./Lamp";
import Wall from "./Wall";
interface ItemsProps {
  items: Item[];
  snapToGrid: boolean;
  setCurrentItemId: (id: number) => any;
  currentItemId?: number;
  itemToAdd: string;
}
function PlanerItems(props: ItemsProps): JSX.Element {
  const { items, setCurrentItemId, currentItemId, itemToAdd } = props;
  const [rectItems, setRectItmes] = useState<Item[]>();
  const [walls, setWalls] = useState<Item[]>();

  useEffect(() => {
    let newWalls: Item[] = [];
    let rectItems: Item[] = [];
    items.forEach((item) => {
      if (item && item.type === itemList.wall) {
        newWalls.push(item);
      }
      if (
        item &&
        item.type !== itemList.wall &&
        item.type !== itemList.pointer &&
        item.position.width &&
        item.position.height
      ) {
        rectItems.push(item);
      }
    });
    setRectItmes([...rectItems]);
    setWalls([...newWalls]);
  }, [items.length, items]);

  function shouldHighlight() {
    return itemToAdd === itemList.pointer;
  }

  return (
    <>
      {walls?.map((item) => {
        return (
          <Wall
            key={item.id}
            position={{
              start: item.position.start!,
              end: item.position.end!,
            }}
            id={item.id}
            type={item.type}
            onMouseOverColor={shouldHighlight() ? "red" : "black"}
            stroke="black"
            currentItemId={currentItemId}
            setCurrentItemId={setCurrentItemId}
            shouldSetItem={shouldHighlight()}
          />
        );
      })}
      {rectItems?.map((item) => {
        let itemParams = itemsCatalogueItems.find(
          (obj) => obj.name === item.type
        );
        return (
          <Lamp
            key={item.id}
            id={item.id}
            mousePosition={item.position.start!}
            width={itemParams?.width!}
            height={itemParams?.height!}
            showBlur={
              itemToAdd === itemList.pointer && currentItemId !== item.id
            }
            currentItemId={currentItemId}
            onClickBlur={itemToAdd === itemList.pointer}
            setCurrentItemId={setCurrentItemId}
            shouldSetItem={shouldHighlight()}
            fill={itemParams?.fill}
            stroke={itemParams?.stroke}
          />
        );
      })}
    </>
  );
}

//export default PlanerItems;
export default React.memo(PlanerItems, (prevProps, nextProps) => {
  return (
    prevProps.items.length === nextProps.items.length &&
    prevProps.itemToAdd === nextProps.itemToAdd &&
    prevProps.currentItemId === nextProps.currentItemId
  );
});
