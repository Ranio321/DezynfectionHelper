import React from "react";
import Icon from "./Items/Icon";
import { icons } from "./Items/Icons";
import "./OptionsSidebar.scss";
interface OptionsSidebarProps {
  undo?: () => any;
  delete?: () => any;
  newCanvas?: () => any;
}

export default function OptionsSidebar(props: OptionsSidebarProps) {
  return (
    <div id="optionsBar">
      <Icon icon={icons.newFile} onClick={props.newCanvas} tooltip="New file" />
      <Icon icon={icons.delete} tooltip="Delet all" onClick={props.delete} />
      <Icon icon={icons.undo} onClick={props.undo} tooltip="Undo" />
    </div>
  );
}
