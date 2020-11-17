import React, { useEffect, useState } from "react";
import { Circle, Group, Rect, Text } from "react-konva";
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
  strokeWidth?: number;
  text?: string;
  onDragEnd?: () => any;
  showCircle?: boolean;
  cricleRadius?: number;
}

export default function Lamp(props: LampProps): JSX.Element {
  const {
    mousePosition,
    height,
    width,
    showBlur,
    setCurrentItemId,
    onClickBlur,
    shouldSetItem,
    fill,
    stroke,
    id,
    strokeWidth,
    text,
    showCircle,
    cricleRadius,
  } = props;
  const [lampPosition, setLampPosition] = useState<Point>({
    x: -1000,
    y: -10000,
  });
  const [shadowBlur, setShadowBlur] = useState(0);
  const [textWidth, setTextWidth] = useState(0);

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
    var canvas: any = document.createElement("canvas");
    var context = canvas.getContext("2d");
    context.font = "12px TimesNewRoman";
    var metrics = context.measureText(text);
    setTextWidth(metrics.width);
  }, [text]);

  return (
    <>
      <Group
        key={props.id}
        height={height}
        width={width}
        x={lampPosition.x}
        y={lampPosition.y}
        draggable
        onDragEnd={props.onDragEnd}
      >
        {showCircle && (
          <Circle
            radius={cricleRadius ? cricleRadius : 0}
            fill="blue"
            opacity={0.2}
            listening={false}
            x={width / 2}
            y={height / 2}
          />
        )}
        <Rect
          key={props.id}
          fill={fill}
          height={height}
          width={width}
          stroke={stroke}
          strokeWidth={strokeWidth}
          shadowBlur={shadowBlur}
          onMouseEnter={() => {
            showBlur && setShadowBlur(20);
          }}
          onMouseLeave={() => {
            showBlur && setShadowBlur(0);
          }}
          onClick={() => onClick()}
        />

        <Text
          text={text}
          fontSize={12}
          x={textWidth <= width + 3 ? 0 : -textWidth / 2 + 15}
          y={-15}
          width={textWidth}
          fill="black"
          align="center"
          verticalAlign="middle"
          fontFamily="TimesNewRoman"
        />
      </Group>
    </>
  );
}
