import React, { ReactNode } from "react";
import { Popover } from "react-bootstrap";
interface PopoverBoxProps {
  title: string;
  children: ReactNode;
  width: string;
}

export function PopoverBox(props: PopoverBoxProps) {
  const { title, children, width } = props;
  return (
    <Popover id="popover-basic" style={{ width }}>
      <Popover.Title as="h3">{title}</Popover.Title>
      <Popover.Content>{children}</Popover.Content>
    </Popover>
  );
}
