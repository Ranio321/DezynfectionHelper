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
  } = props;
  const [lampPosition, setLampPosition] = useState<Point>({ x: 0, y: 0 });
  const [shadowBlur, setShadowBlur] = useState(0);

  useEffect(() => {
    let x = mousePosition.x - width / 2;
    let y = mousePosition.y - height / 2;
    setLampPosition({ x: x, y: y });
  }, [mousePosition]);

  function onClick() {
    if (onClickBlur) {
      setShadowBlur(20);
    }
    if (setCurrentItemId && shouldSetItem) {
      setCurrentItemId(props.id);
    }
  }
  useEffect(() => {
    if (currentItemId !== props.id) {
      setShadowBlur(0);
    }
  }, [currentItemId]);

  return (
    <Rect
      key={props.id}
      fill="#03cffc"
      height={height}
      width={width}
      x={lampPosition.x}
      y={lampPosition.y}
      stroke="black"
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
