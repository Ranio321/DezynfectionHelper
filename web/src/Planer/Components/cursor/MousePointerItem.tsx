import React from "react";
import { calculateDisinfectionRadius } from "../../utils/calculateDisinfectionRadius";
import { itemsCatalogueItems } from "../../catalogue/ItemsCatalogueList";
import { MousePosition } from "../../PlanerTypes";
import { lampParams } from "../items/Constants/LampConstants";
import Lamp from "../items/Lamp";
import { itemList } from "../sidebar/leftSidebar/SidebarItems/Items";
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
        return item.displayName === mouseItem;
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
          text={item?.displayName}
          showCircle
          cricleRadius={calculateDisinfectionRadius(
            item?.angle,
            lampParams.defaultHeight
          )}
        />
      );
      break;
  }

  return pointer;
}
