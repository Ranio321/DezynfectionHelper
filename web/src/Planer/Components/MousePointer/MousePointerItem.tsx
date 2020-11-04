import React from "react";
import { itemsCatalogueItems } from "../../ItemsCatalogue/ItemsCatalogueList";
import { MousePosition } from "../../PlanerTypes";
import Lamp from "../Items/Lamp";
import { itemList } from "../Sidebar/SidebarItems/Items";
import CirclePointer from "./CirclePointer";
interface MousePointerItemProps {
  mousePosition: MousePosition;
  mouseItem: string;
}

export default function MousePointerItem(
  props: MousePointerItemProps
): JSX.Element {
  const { mousePosition, mouseItem } = props;
  let pointer = <></>;
  switch (mouseItem) {
    case itemList.wall:
      pointer = <CirclePointer mousePosition={mousePosition} />;
      break;

    case itemList.pointer:
      pointer = <></>;
      break;

    default:
      let item = itemsCatalogueItems.find((item) => {
        return item.name === mouseItem;
      });
      pointer = (
        <Lamp
          id={Date.now()}
          width={item?.width!}
          height={item?.height!}
          mousePosition={mousePosition}
          stroke={item?.stroke}
          fill={item?.fill}
          strokeWidth={item?.strokeWidth}
          text={item?.name}
        />
      );
      break;
  }

  return pointer;
}
