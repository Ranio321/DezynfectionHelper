import React from "react";
import { ClickPoints } from "../../PlanerTypes";
import CustomLine from "../lines/CustomLine";
interface WallsProps {
  position: ClickPoints;
  id: number;
  type: string;
  snapToGrid?: boolean;
  stroke?: string;
  onMouseOverColor: string;
  setCurrentItemId?: (id: number) => any;
  currentItemId?: number;
  shouldSetItem?: boolean;
}
export default function Wall(props: WallsProps) {
  const { position, id, ...rest } = props;

  return (
    <CustomLine
      uniqueId={id}
      points={[
        position.start.x,
        position.start.y,
        position.end.x,
        position.end.y,
      ]}
      {...rest}
      isSelected={rest.currentItemId === id}
    />
  );
}
