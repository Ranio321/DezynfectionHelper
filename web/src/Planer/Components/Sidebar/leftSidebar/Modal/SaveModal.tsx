import React from "react";
import { Button, Modal } from "react-bootstrap";
interface SaveModalProps {
  onHide: () => any;
  show: boolean;
  text: JSX.Element;
}

export default function SaveModal(props: SaveModalProps): JSX.Element {
  const { text, show, onHide } = props;
  return (
    <Modal
      animation={false}
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header style={{ backgroundColor: "#0069d9" }}></Modal.Header>
      <Modal.Body>
        <h4 style={{ textAlign: "center", color: "forestgreen" }}>{text}</h4>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide}>Ok</Button>
      </Modal.Footer>
    </Modal>
  );
}
