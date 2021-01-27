import React, { useEffect, useState } from "react";
import { calculateDisinfectionRadius } from "../../Helpers/calculateDisinfectionRadius";
import { inDisinfectionRange } from "../../Helpers/inDisinfectionRange";
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
  onLampDragEnd: (id: number, item: Item) => any;
}
function PlanerItems(props: ItemsProps): JSX.Element {
  const {
    items,
    setCurrentItemId,
    currentItemId,
    itemToAdd,
    onLampDragEnd,
  } = props;
  const [rectItems, setRectItmes] = useState<Item[]>([]);
  const [walls, setWalls] = useState<Item[]>([]);
  const [lamps, setLamps] = useState<Item[]>([]);

  useEffect(() => {
    let newWalls: Item[] = [];
    let newRectItems: Item[] = [];
    let newLamps: Item[] = [];
    items.forEach((item) => {
      if (item && item.type === itemList.wall) {
        newWalls.push(item);
      } else if (
        item &&
        item.type !== itemList.wall &&
        item.type !== itemList.pointer &&
        item.position.width &&
        item.position.height &&
        item.type.includes("Lamp")
      ) {
        newLamps.push(item);
      } else {
        newRectItems.push(item);
      }
    });
    setLamps([...newLamps]);
    setRectItmes([...newRectItems]);
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
      {lamps?.map((item) => {
        let itemParams = itemsCatalogueItems.find(
          (obj) => obj.displayName === item.type
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
            strokeWidth={itemParams?.strokeWidth}
            text={itemParams?.displayName}
            onDragEnd={() => onLampDragEnd(item.id, item)}
            showCircle
            cricleRadius={calculateDisinfectionRadius(
              itemParams?.angle,
              item.height
            )}
          />
        );
      })}
      {rectItems?.map((item) => {
        let itemParams = itemsCatalogueItems.find(
          (obj) => obj.displayName === item.type
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
            fill={
              inDisinfectionRange(item, lamps, walls)
                ? itemParams?.fill
                : "lightGreen"
            }
            stroke={itemParams?.stroke}
            strokeWidth={itemParams?.strokeWidth}
            text={itemParams?.displayName}
            onDragEnd={() => onLampDragEnd(item.id, item)}
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
    prevProps.currentItemId === nextProps.currentItemId &&
    JSON.stringify(prevProps.items) === JSON.stringify(nextProps.items)
  );
});
