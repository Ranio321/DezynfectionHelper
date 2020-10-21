import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Sidebar from "./Components/Sidebar/Sidebar";
import PlanCanvas from "./PlanCanvas";
interface PlanerProps {}

export default function Planer(props: PlanerProps): JSX.Element {

    const [itemToAdd, setitemToAdd] = useState<string>("");
  return (
    <Container fluid>
      <Row noGutters>
        <Col> 
        <Sidebar setItem = {setitemToAdd}/>
        </Col>
        <Col>
          <PlanCanvas width={1000} height={800} itemToAdd = {itemToAdd}/>
        </Col>
      </Row>
    </Container>
  );
}
