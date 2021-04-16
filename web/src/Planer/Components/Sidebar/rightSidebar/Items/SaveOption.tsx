import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import "./Option.scss";
import SaveModal from "../Modal/SaveModal";
import { modalTextItems } from "../Modal/SaveModalUtils";
import SaveModalForm from "../Modal/SaveModalForm";
import ReactTooltip from "react-tooltip";
interface IconProps {
  icon: IconProp;
  onClick?: (name: string) => any;
  tooltip: string;
  modal?: boolean;
  changeName?: boolean;
  update: () => any;
}

export default function SaveOption(props: IconProps): JSX.Element {
  const { icon, tooltip, modal, onClick, changeName, update } = props;
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalTextIndex, setModalTextIndex] = useState<number>(0);
  const [showModalForm, setShowModalForm] = useState<boolean>(false);
  const [name, setName] = useState<string>("");

  function onSaveClick() {
    setShowModal(true);
    let response;
    if (onClick) {
      response = onClick(name);
    }
    response.then(() => setModalTextIndex(1)).catch(() => setModalTextIndex(2));
  }

  function onUpdate() {
    let response = update();
    response.then(() => setModalTextIndex(1)).catch(() => setModalTextIndex(2));
  }

  function onModalHide() {
    setShowModal(false);
    setModalTextIndex(0);
  }

  function onIconClick() {
    if (changeName) {
      setShowModalForm(true);
      setName("");
    } else {
      setShowModal(true);
      onUpdate();
    }
  }
  return (
    <>
      {modal && (
        <SaveModal
          onHide={onModalHide}
          show={showModal}
          text={modalTextItems[modalTextIndex]}
        />
      )}
      {showModalForm && (
        <SaveModalForm
          onHide={() => setShowModalForm(false)}
          show={showModalForm}
          name={name}
          onSave={() => {
            onSaveClick();
            setShowModalForm(false);
          }}
          setName={setName}
        />
      )}{" "}
      <div
        className="OptionsIconDiv"
        onClick={onIconClick}
        data-tip
        data-for={tooltip}
      >
        <FontAwesomeIcon className="OptionsIcon" icon={icon} size="2x" />
      </div>
      <ReactTooltip
        id={tooltip}
        place="left"
        effect="solid"
        offset={{ bottom: 2 }}
        delayShow={100}
      >
        {tooltip}
      </ReactTooltip>
    </>
  );
}
