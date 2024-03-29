import React from "react";
import { Layer, Line } from "react-konva";
import params from "./GridConstants";

interface GridProps {
  width: number;
  height: number;
}
function Grid(props: GridProps): JSX.Element {
  const { width, height } = props;

  function generateGrid2() {
    const lines = [];
    let position = 0;
    let id = 0;
    for (let x = 0; x < width / params.height; x++) {
      let strokeWidth = params.strokeWidth;
      if (x % 5 === 0) {
        strokeWidth = strokeWidth * 4;
      }
      lines.push(
        <Line
          key={id}
          points={[position, 0, position, height]}
          stroke="black"
          strokeWidth={strokeWidth}
        />
      );
      position = position + params.height;
      id++;
    }
    position = 0;
    for (let x = 0; x < width / params.height; x++) {
      let strokeWidth = params.strokeWidth;
      if (x % 5 === 0) {
        strokeWidth = strokeWidth * 4;
      }
      lines.push(
        <Line
          key={id}
          points={[0, position, width, position]}
          stroke="black"
          strokeWidth={strokeWidth}
        />
      );
      position = position + params.height;
      id++;
    }
    return lines;
  }

  return <Layer>{generateGrid2()}</Layer>;
}
export default React.memo(Grid);
