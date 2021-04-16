import React, { useState } from "react";
import "./Tooltip.scss";
interface TooltipProps {
  direction?: string;
  children: JSX.Element;
  content?: JSX.Element;
  delay?: number;
}

export function Tooltip(props: TooltipProps) {
  const { direction, children, content, delay } = props;
  let timeout: NodeJS.Timeout;
  const [active, setActive] = useState(false);

  const showTip = () => {
    timeout = setTimeout(() => {
      setActive(true);
    }, delay || 400);
  };

  const hideTip = () => {
    clearInterval(timeout);

    setActive(false);
  };

  return (
    <div
      className="Tooltip-Wrapper"
      onMouseEnter={showTip}
      onMouseLeave={hideTip}
    >
      {children}
      {active && (
        <div className={`Tooltip-Tip ${direction || "top"}`}>{content}</div>
      )}
    </div>
  );
}

export default Tooltip;
