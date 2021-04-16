import React from "react";
import { icons } from "./Items/Icons";
import "./RightSidebar.scss";
import Option from "./Items/Option";
import SaveOption from "./Items/SaveOption";
import { useHistory } from "react-router-dom";
interface OptionsSidebarProps {
  onUndo?: () => any;
  onDelete?: () => any;
  onNewCanvas?: () => any;
  onSave?: (name: string) => any;
  changeName?: boolean;
  onUpdate: () => any;
}

export default function OptionsSidebar(props: OptionsSidebarProps) {
  const { onUpdate, onDelete, onNewCanvas, onSave, onUndo } = props;
  const history = useHistory();

  return (
    <div id="optionsBar">
      <Option
        icon={icons.home}
        tooltip="Return to home screen"
        onClick={() => history.push("/home/projects")}
      />
      <Option icon={icons.newFile} onClick={onNewCanvas} tooltip="New file" />
      <Option icon={icons.delete} tooltip="Delete all" onClick={onDelete} />
      <Option icon={icons.undo} onClick={onUndo} tooltip="Undo" />
      <SaveOption
        icon={icons.save}
        onClick={onSave}
        tooltip="Save"
        modal
        changeName={props.changeName}
        update={onUpdate}
      />
    </div>
  );
}
