import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import "./Icon.scss";
interface IconProps {
  icon: IconProp;
  onClick?: () => any;
}

export default function (props: IconProps): JSX.Element {
  const { icon } = props;
  return (
    <div className="OptionsIconDiv" onClick={props.onClick}>
      <FontAwesomeIcon className="OptionsIcon" icon={icon} size="2x" />
    </div>
  );
}
