import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
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
      <OverlayTrigger
        placement="left"
        delay={{ show: 100, hide: 5 }}
        overlay={
          <Tooltip style={{ margin: "0px" }} id="button-tooltip">
            {tooltip}
          </Tooltip>
        }
      >
        <div
          className="cardOptionsIconDiv"
          onClick={!disabled ? onClick : undefined}
        >
          <FontAwesomeIcon
            className="cardOptionsIcon"
            icon={icon}
            size="2x"
            style={{ color: color, opacity: disabled ? "0.5" : "1" }}
            onMouseEnter={() => !disabled && setColor(hoverColor)}
            onMouseLeave={() => setColor("black")}
          />
        </div>
      </OverlayTrigger>
    </>
  );
}
