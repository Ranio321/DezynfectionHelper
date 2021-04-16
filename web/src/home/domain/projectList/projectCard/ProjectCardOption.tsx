import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import ReactTooltip from "react-tooltip";
import "./ProjectCardOption.scss";
interface ProjectCardOptionProps {
  icon: IconProp;
  onClick?: () => any;
  tooltip: string;
  hoverColor: string;
  disabled?: boolean;
}

export default function ProjectCardOption(
  props: ProjectCardOptionProps
): JSX.Element {
  const { icon, tooltip, onClick, hoverColor, disabled } = props;
  const [color, setColor] = useState("black");

  useEffect(() => {
    if (disabled) {
      setColor("black");
    }
  }, [disabled]);

  return (
    <>
      <div
        className="card-options"
        onClick={!disabled ? onClick : undefined}
        data-tip
        data-for={tooltip}
      >
        <FontAwesomeIcon
          icon={icon}
          size="2x"
          style={{ color: color, opacity: disabled ? "0.5" : "1" }}
          onMouseEnter={() => !disabled && setColor(hoverColor)}
          onMouseLeave={() => setColor("black")}
        />
      </div>
      <ReactTooltip delayShow={100} id={tooltip} place="left" effect="solid">
        {tooltip}
      </ReactTooltip>
    </>
  );
}
