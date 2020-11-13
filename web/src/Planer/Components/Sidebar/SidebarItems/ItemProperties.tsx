import React, { useEffect, useState } from "react";
import { Item } from "../../../PlanerTypes";
import "./ItemProperties.scss";
import "../Sidebar.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { Button, Col, Container, Row } from "react-bootstrap";
import { cloneObject } from "../../../Helpers/cloneObject";
interface ItemPropertiesProps {
  item?: Item;
  onWallDelete: (id: number) => any;
  changeItem: (id: number, item: Item) => any;
}

export default function ItemProperties(
  props: ItemPropertiesProps
): JSX.Element {
  const { item } = props;
  const [height, setHeight] = useState<number>();

  useEffect(() => {
    setHeight(item?.height);
  }, [item?.height]);

  function onSubmit() {
    let newItem = cloneObject(item);
    if (newItem) {
      newItem.height = height;
      if (item) {
        props.changeItem(item?.id, newItem);
      }
    }
  }

  return (
    <>
      <div id="sidebarButton">Static properties</div>
      <div id="itemProperties">
        <Container>
          <Row>
            <div id="text"> X1</div>
            <input
              id="input"
              value={Math.round(item?.position.start?.x!)}
              readOnly
            ></input>
          </Row>
          <Row>
            <div id="text"> Y1</div>
            <input
              id="input"
              value={Math.round(item?.position.start?.y!)}
              readOnly
            ></input>
          </Row>

          <Row>
            <div id="text"> X2</div>
            <input id="input" value={item?.position.end?.x} readOnly></input>
          </Row>
          <Row>
            <div id="text"> Y2</div>
            <input id="input" value={item?.position.end?.y} readOnly></input>
          </Row>
          <Row>
            <div id="sidebarButton">Dynamic properties</div>
          </Row>
          <Row>
            <div id="text"> Height</div>
            <input
              id="input"
              value={height}
              onChange={(e) => setHeight(parseInt(e.target.value))}
            ></input>
            <div className="unit">Cm</div>
          </Row>

          <Row>
            <Col style={{ padding: "0px" }}>
              <FontAwesomeIcon
                className="trash"
                icon={faTrashAlt}
                size="lg"
                onClick={() => {
                  props.onWallDelete(props.item?.id!);
                }}
              />
            </Col>
          </Row>
          <Row>
            <Button
              variant="primary"
              className="submitButton"
              onClick={() => onSubmit()}
            >
              Submit changes
            </Button>
          </Row>
        </Container>
      </div>
    </>
  );
}
