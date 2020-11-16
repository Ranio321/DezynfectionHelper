import React from "react";
import { calculateDezynfectionRadius } from "../../Helpers/calculateDezynfectionRadius";
import { itemsCatalogueItems } from "../../ItemsCatalogue/ItemsCatalogueList";
import { MousePosition } from "../../PlanerTypes";
import { lampParams } from "../Items/Constants/LampConstants";
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
          cricleRadius={calculateDezynfectionRadius(
            item?.angle,
            lampParams.defaultHeight
          )}
        />
      );
      break;
  }

  return pointer;
}
