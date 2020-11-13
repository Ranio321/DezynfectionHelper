import React from "react";
import { icons } from "./Items/Icons";
import "./OptionsSidebar.scss";
import Option from "./Items/Option";
import SaveOption from "./Items/SaveOption";
interface OptionsSidebarProps {
  undo?: () => any;
  delete?: () => any;
  newCanvas?: () => any;
  save?: (name: string) => any;
}

export default function OptionsSidebar(props: OptionsSidebarProps) {
  return (
    <div id="optionsBar">
      <Option
        icon={icons.newFile}
        onClick={props.newCanvas}
        tooltip="New file"
      />
      <Option icon={icons.delete} tooltip="Delete all" onClick={props.delete} />
      <Option icon={icons.undo} onClick={props.undo} tooltip="Undo" />
      <SaveOption icon={icons.save} onClick={props.save} tooltip="Save" modal />
    </div>
  );
}
