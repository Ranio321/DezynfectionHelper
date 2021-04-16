import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import "./Option.scss";
import ReactTooltip from "react-tooltip";
interface IconProps {
  icon: IconProp;
  onClick?: () => any;
  tooltip: string;
}

export default function Option(props: IconProps): JSX.Element {
  const { icon, tooltip, onClick } = props;

  return (
    <div data-for={tooltip} data-tip>
      <div className="OptionsIconDiv" onClick={onClick}>
        <FontAwesomeIcon className="OptionsIcon" icon={icon} size="2x" />
      </div>
      <ReactTooltip
        id={tooltip}
        place="left"
        effect="solid"
        offset={{ bottom: 5 }}
        delayShow={150}
      >
        {tooltip}
      </ReactTooltip>
    </div>
  );
}
