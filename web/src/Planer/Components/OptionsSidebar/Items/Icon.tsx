import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import "./Icon.scss";
import SaveModal from "./SaveModal";
import { modalText } from "./SaveModalUtils";
interface IconProps {
  icon: IconProp;
  onClick?: () => any;
  tooltip: string;
  modal?: boolean;
}

export default function (props: IconProps): JSX.Element {
  const { icon, tooltip, modal, onClick } = props;
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalTextIndex, setModalTextIndex] = useState<number>(0);

  function onIconClick() {
    setShowModal(true);
    let response = onClick?.call(null);
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
          text={modalText[modalTextIndex]}
        />
      )}
      <OverlayTrigger
        placement="left"
        delay={{ show: 100, hide: 100 }}
        overlay={<Tooltip id="button-tooltip">{tooltip}</Tooltip>}
      >
        <div className="OptionsIconDiv" onClick={() => onIconClick()}>
          <FontAwesomeIcon className="OptionsIcon" icon={icon} size="2x" />
        </div>
      </OverlayTrigger>
    </>
  );
}
