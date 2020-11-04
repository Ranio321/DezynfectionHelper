import React from "react";
import "./GridScale.scss";
import params from "./GridConstants";

interface GridScaleProps {
  width: number;
}
export default function TopGridScale(props: GridScaleProps): JSX.Element {
  const { width } = props;

  var scale = [];
  let scaleNumber = 0;
  let strokeWidth = params.scale;
  for (let i = 0; i < width - strokeWidth; i = i + strokeWidth) {
    scale.push(
      <div key={"topScale" + scaleNumber} className="topGridItem">
        {scaleNumber}
      </div>
    );
    scaleNumber += 100;
  }
  return (
    <div className="topGridScale">
      <div className="blankItem"></div>
      {scale}
    </div>
  );
}
