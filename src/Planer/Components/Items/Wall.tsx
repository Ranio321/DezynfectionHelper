import React from "react";
import { ClickPoints } from "../../PlanerTypes";
import CustomLine from "../Lines/CustomLine";
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
  const {
    position,
    id,
    type,
    snapToGrid,
    stroke,
    setCurrentItemId,
    onMouseOverColor,
    currentItemId,
    shouldSetItem,
  } = props;

  return (
    <CustomLine
      uniqueId={id}
      type={type}
      points={[
        position.start.x,
        position.start.y,
        position.end.x,
        position.end.y,
      ]}
      stroke={stroke}
      snapToGrid={snapToGrid}
      onMouseOverColor={onMouseOverColor}
      setCurrentItemId={setCurrentItemId}
      shouldSetItem={shouldSetItem}
      currentItemId={currentItemId}
      isSelected={currentItemId === id}
    />
  );
}
