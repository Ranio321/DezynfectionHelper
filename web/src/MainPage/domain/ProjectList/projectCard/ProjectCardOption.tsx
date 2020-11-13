import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import "./ProjectCardOption.scss";
interface ProjectCardOptionProps {
  icon: IconProp;
  onClick?: () => any;
  tooltip: string;
  hoverColor: string;
}

export default function ProjectCardOption(
  props: ProjectCardOptionProps
): JSX.Element {
  const { icon, tooltip, onClick, hoverColor } = props;
  const [color, setColor] = useState("black");

  return (
    <>
      <OverlayTrigger
        placement="left"
        delay={{ show: 100, hide: 5 }}
        overlay={
          <Tooltip style={{ margin: 0 }} id="button-tooltip">
            {tooltip}
          </Tooltip>
        }
      >
        <div className="cardOptionsIconDiv" onClick={onClick}>
          <FontAwesomeIcon
            className="cardOptionsIcon"
            icon={icon}
            size="2x"
            style={{ color: color }}
            onMouseEnter={() => setColor(hoverColor)}
            onMouseLeave={() => setColor("black")}
          />
        </div>
      </OverlayTrigger>
    </>
  );
}
