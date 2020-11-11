import React from "react";
import Icon from "./Items/Icon";
import { icons } from "./Items/Icons";
import "./OptionsSidebar.scss";
interface OptionsSidebarProps {
  undo?: () => any;
  delete?: () => any;
  newCanvas?: () => any;
  save?: () => any;
}

export default function OptionsSidebar(props: OptionsSidebarProps) {
  return (
    <div id="optionsBar">
      <Icon icon={icons.newFile} onClick={props.newCanvas} tooltip="New file" />
      <Icon icon={icons.delete} tooltip="Delete all" onClick={props.delete} />
      <Icon icon={icons.undo} onClick={props.undo} tooltip="Undo" />
      <Icon icon={icons.save} onClick={props.save} tooltip="Save" modal />
    </div>
  );
}
