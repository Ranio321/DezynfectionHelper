import React from "react";
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
    case itemList.lamp:
      pointer = (
        <Lamp
          id={Date.now()}
          width={lampParams.width}
          height={lampParams.height}
          mousePosition={mousePosition}
        />
      );
      break;
    case itemList.pointer:
      pointer = <></>;
  }

  return pointer;
}
