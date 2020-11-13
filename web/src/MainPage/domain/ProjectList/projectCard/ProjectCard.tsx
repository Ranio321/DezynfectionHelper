import { faClock, faTrash } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import "./ProjectCard.scss";
import ProjectCardOption from "./ProjectCardOption";
interface ProjectCardProps {
  title?: string;
  projectId: number;
  onClick: (id: number) => any;
  onTrashClick: (id: number) => any;
}

export default function ProjectCard(props: ProjectCardProps) {
  const { title, projectId, onClick, onTrashClick } = props;

  return (
    <div className="projectCard">
      <Container fluid style={{ height: "100%", minHeight: "100%" }}>
        <Row>
          <p className="item-title">{title}</p>
        </Row>
        <Row>Some text</Row>
        <Row>
          <Col lg={1}>
            <Button
              onClick={() => onClick(projectId)}
              variant="warning"
              style={{ paddingBottom: "4px" }}
            >
              Modify
            </Button>
          </Col>
          <Col lg={{ span: 2, offset: 9 }}>
            <div className="icons">
              <ProjectCardOption
                tooltip="Delete"
                icon={faTrash}
                onClick={() => onTrashClick(projectId)}
                hoverColor="red"
              />
              <ProjectCardOption
                icon={faClock}
                tooltip="Calculate dezynfection time"
                hoverColor="#1ca6fc"
              />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
