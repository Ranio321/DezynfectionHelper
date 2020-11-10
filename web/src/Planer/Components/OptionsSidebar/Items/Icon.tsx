import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import "./Icon.scss";
interface IconProps {
  icon: IconProp;
  onClick?: () => any;
  tooltip: string;
}

export default function (props: IconProps): JSX.Element {
  const { icon, tooltip } = props;
  return (
    <OverlayTrigger
      placement="left"
      delay={{ show: 100, hide: 100 }}
      overlay={<Tooltip id="button-tooltip">{tooltip}</Tooltip>}
    >
      <div className="OptionsIconDiv" onClick={props.onClick}>
        <FontAwesomeIcon className="OptionsIcon" icon={icon} size="2x" />
      </div>
    </OverlayTrigger>
  );
}