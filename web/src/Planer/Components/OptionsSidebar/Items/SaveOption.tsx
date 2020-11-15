import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import "./Option.scss";
import SaveModal from "../Modal/SaveModal";
import { modalTextItems } from "../Modal/SaveModalUtils";
import SaveModalForm from "../Modal/SaveModalForm";
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
      )}
      <OverlayTrigger
        placement="left"
        delay={{ show: 100, hide: 100 }}
        overlay={
          <Tooltip style={{ margin: 0 }} id="button-tooltip">
            {tooltip}
          </Tooltip>
        }
      >
        <div
          className="OptionsIconDiv"
          onClick={() => {
            if (changeName) {
              setShowModalForm(true);
              setName("");
            } else {
              setShowModal(true);
              onUpdate();
            }
          }}
        >
          <FontAwesomeIcon className="OptionsIcon" icon={icon} size="2x" />
        </div>
      </OverlayTrigger>
    </>
  );
}
