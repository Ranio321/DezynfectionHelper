import React, { useEffect, useState } from "react";
import { cloneObject } from "../../Helpers/cloneObject";
import { itemsCatalogueItems } from "../../ItemsCatalogue/ItemsCatalogueList";
import { Items } from "../../PlanerTypes";
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
  const { items, setCurrentItemId, currentItemId, itemToAdd } = props;
  const [rectItems, setRectItmes] = useState<Items[]>();
  const [walls, setWalls] = useState<Items[]>();

  useEffect(() => {
    let newWalls: Items[] = [];
    let rectItems: Items[] = [];
    items.forEach((item) => {
      if (item.item && item.item.type === itemList.wall) {
        newWalls.push(item);
      }
      if (
        item.item &&
        item.item.type !== itemList.wall &&
        item.item.type !== itemList.pointer &&
        item.item.position.width &&
        item.item.position.height
      ) {
        rectItems.push(item);
      }
    });
    setRectItmes([...rectItems]);
    setWalls([...newWalls]);
    console.log(rectItems);
  }, [items.length, items]);

  function shouldHighlight() {
    return itemToAdd === itemList.pointer;
  }

  return (
    <>
      {walls?.map((item) => {
        return (
          <Wall
            key={item.item.id}
            position={{
              start: item.item.position.start!,
              end: item.item.position.end!,
            }}
            id={item.item.id}
            type={item.item.type}
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
          (obj) => obj.name === item.item.type
        );
        return (
          <Lamp
            key={item.item.id}
            id={item.item.id}
            mousePosition={item.item.position.start!}
            width={itemParams?.width!}
            height={itemParams?.height!}
            showBlur={
              itemToAdd === itemList.pointer && currentItemId !== item.item.id
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
