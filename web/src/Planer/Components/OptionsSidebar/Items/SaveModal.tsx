import React from "react";
import { Button, Modal } from "react-bootstrap";
interface SaveModalProps {
  onHide: () => any;
  show: boolean;
  text: string;
}

export default function SaveModal(props: SaveModalProps): JSX.Element {
  const { text, show, onHide } = props;
  return (
    <Modal
      show={show}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body>
        <h4 style={{ textAlign: "center", color: "forestgreen" }}>{text}</h4>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide}>Ok</Button>
      </Modal.Footer>
    </Modal>
  );
}
