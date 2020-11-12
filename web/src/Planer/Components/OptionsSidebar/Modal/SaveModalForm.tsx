import { MDBInput } from "mdbreact";
import React from "react";
import { Button, FormControl, InputGroup, Modal } from "react-bootstrap";
interface SaveModalFormProps {
  show: boolean;
  onHide: () => any;
  setName: (name: string) => any;
  name: string;
  onSave: () => any;
}
export default function SaveModalForm(props: SaveModalFormProps): JSX.Element {
  const { show, onHide, onSave, name, setName } = props;
  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header style={{ backgroundColor: "#0069d9" }}></Modal.Header>
      <Modal.Body>
        <InputGroup className="mb-3">
          <FormControl
            placeholder="Project name"
            aria-label="Project name"
            aria-describedby="basic-addon1"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </InputGroup>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onSave} variant="success" disabled={name.length < 1}>
          Save
        </Button>
        <Button onClick={onHide} variant="danger">
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
