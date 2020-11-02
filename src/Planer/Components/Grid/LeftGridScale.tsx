import React from "react";
import params from "./GridConstants";
import "./GridScale.scss";
interface LeftGridScaleProps {
  height: number;
}
function LeftGridScale(props: LeftGridScaleProps): JSX.Element {
  const { height } = props;

  let scale = [];
  let strokeHeight: number = 5 * params.height;
  let scaleNumber: number = 0;

  for (let i = 0; i < height - strokeHeight; i = i + strokeHeight) {
    let scaleText = [];
    let txt = scaleNumber.toString();
    for (let x = 0; x < txt.length; x++) {
      scaleText.push(
        <>
          {txt[x]}
          <span className="br" />
        </>
      );
    }
    scale.push(
      <div key={"leftScale" + scaleNumber} className="leftGridItem">
        {scaleText}
      </div>
    );
    scaleNumber += strokeHeight;
  }
  return <div className="leftGridScale">{scale}</div>;
}
export default React.memo(LeftGridScale);
