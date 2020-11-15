import React from "react";
import { icons } from "./Items/Icons";
import "./OptionsSidebar.scss";
import Option from "./Items/Option";
import SaveOption from "./Items/SaveOption";
import { useHistory } from "react-router-dom";
interface OptionsSidebarProps {
  undo?: () => any;
  delete?: () => any;
  newCanvas?: () => any;
  save?: (name: string) => any;
  changeName?: boolean;
  update: () => any;
}

export default function OptionsSidebar(props: OptionsSidebarProps) {
  const history = useHistory();

  return (
    <div id="optionsBar">
      <Option
        icon={icons.home}
        tooltip="Return to home screen"
        onClick={() => history.push("/")}
      />
      <Option
        icon={icons.newFile}
        onClick={props.newCanvas}
        tooltip="New file"
      />
      <Option icon={icons.delete} tooltip="Delete all" onClick={props.delete} />
      <Option icon={icons.undo} onClick={props.undo} tooltip="Undo" />
      <SaveOption
        icon={icons.save}
        onClick={props.save}
        tooltip="Save"
        modal
        changeName={props.changeName}
        update={props.update}
      />
    </div>
  );
}
