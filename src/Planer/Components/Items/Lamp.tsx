import React, { useEffect, useState } from "react";
import { Rect } from "react-konva";
import { MousePosition, Point } from "../../PlanerTypes";
interface LampProps {
  mousePosition: MousePosition;
  height: number;
  width: number;
  showBlur?: boolean;
  id: number;
  setCurrentItemId?: (id: number) => any;
  onClickBlur?: boolean;
  currentItemId?: number;
  shouldSetItem?: boolean;
  fill?: string;
  stroke?: string;
}

export default function Lamp(props: LampProps): JSX.Element {
  const {
    mousePosition,
    height,
    width,
    showBlur,
    setCurrentItemId,
    onClickBlur,
    currentItemId,
    shouldSetItem,
    fill,
    stroke,
    id,
  } = props;
  const [lampPosition, setLampPosition] = useState<Point>({ x: 0, y: 0 });
  const [shadowBlur, setShadowBlur] = useState(0);

  useEffect(() => {
    let x = mousePosition.x - width / 2;
    let y = mousePosition.y - height / 2;
    setLampPosition({ x: x, y: y });
  }, [mousePosition, width, height]);

  function onClick() {
    if (onClickBlur) {
      setShadowBlur(20);
    }
    if (setCurrentItemId && shouldSetItem) {
      setCurrentItemId(id);
    }
  }
  useEffect(() => {
    if (currentItemId !== id) {
      setShadowBlur(0);
    }
  }, [currentItemId, id]);

  return (
    <Rect
      key={props.id}
      fill={fill}
      height={height}
      width={width}
      x={lampPosition.x}
      y={lampPosition.y}
      stroke={stroke}
      shadowBlur={shadowBlur}
      onMouseEnter={() => {
        showBlur && setShadowBlur(20);
      }}
      onMouseLeave={() => {
        showBlur && setShadowBlur(0);
      }}
      onClick={() => onClick()}
    />
  );
}
