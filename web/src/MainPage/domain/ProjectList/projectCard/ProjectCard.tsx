import { faPlay, faStop, faTrash } from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useState } from "react";
import { Button, Col, Container, ProgressBar, Row } from "react-bootstrap";
import { dezynfectionServices } from "../../../../api/dezynfectionServices";
import { planerService } from "../../../../api/PlanerServices";
import { createSignalRConnection } from "../../../helpers/createSignalRConnection";
import { timeNumberToReadableString } from "../../../helpers/timeNumberToReadableString";
import "./ProjectCard.scss";
import ProjectCardOption from "./ProjectCardOption";
interface ProjectCardProps {
  title?: string;
  projectId: number;
  onClick: (id: number) => any;
  dezynfectionTime: number;
  error?: string;
  refresh: () => any;
}

export default function ProjectCard(props: ProjectCardProps) {
  const { title, projectId, onClick, dezynfectionTime, error, refresh } = props;

  const [completedPercentag, setCompletedPercentage] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(dezynfectionTime);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let percentage = (elapsedTime / (dezynfectionTime * 60)) * 100;
    setCompletedPercentage(percentage);
    setTimeRemaining(Math.ceil(dezynfectionTime - elapsedTime / 60));
    if (percentage >= 100) {
      setIsCompleted(true);
    }
  }, [elapsedTime]);

  function dezynfectionMessage(time: number) {
    let timeAsString = timeNumberToReadableString(time);
    let message = (
      <>
        Optmial dezynfection time: <b>{timeAsString}</b>
      </>
    );
    return message;
  }

  function getCurrentProgress() {
    let connection = createSignalRConnection();
    connection.on("elapsedTime", (time, id, completed) => {
      if (id == projectId) {
        setIsActive(!completed);
        setElapsedTime(time);
      }
    });
    connection.start();
  }

  function beginDezynfection() {
    dezynfectionServices.beginDezynfection({
      id: projectId,
      time: dezynfectionTime * 60,
    });
    getCurrentProgress();
  }

  function endDezynfection() {
    dezynfectionServices
      .endDezynfection(projectId)
      .then(() => setIsActive(false));
    setElapsedTime(0);
    setIsCompleted(false);
  }

  function onTrashClick(id: number) {
    planerService
      .deleteById(id)
      .then(() => refresh())
      .catch(() => {});
    dezynfectionServices
      .endDezynfection(projectId)
      .then(() => setIsActive(false));
  }

  useEffect(getCurrentProgress, []);
  const errorStyle = {
    background: "rgba(249,62,62,.1)",
    borderColor: "#f93e3e",
  };

  return (
    <div className="projectCard" style={error ? errorStyle : undefined}>
      <Container fluid style={{ height: "100%", minHeight: "100%" }}>
        <Row>
          <p className="item-title">{title}</p>
        </Row>
        <Row>
          <ProgressBar
            striped
            animated
            variant="success"
            className="progressBar"
            now={!error ? completedPercentag : 0}
            label={
              isCompleted ? "Completed" : Math.floor(completedPercentag) + "%"
            }
          />
        </Row>
        <Row style={{ paddingTop: "1px" }}>
          <Col lg={{ span: 5, offset: 1 }}>
            <div id="textContent">
              {error ? error : dezynfectionMessage(dezynfectionTime)}
            </div>
          </Col>
          <Col lg={{ span: 5, offset: 1 }}>
            {!error && (
              <div id="textContent">
                Time remaining:{" "}
                <b>{timeNumberToReadableString(timeRemaining)}</b>
              </div>
            )}
          </Col>
        </Row>
        <Row style={{ paddingTop: "3px" }}>
          <Col lg={1}>
            <Button
              className="button"
              onClick={() => onClick(projectId)}
              variant="warning"
              style={{ paddingBottom: "4px" }}
              active={isActive}
              disabled={isActive}
            >
              Modify
            </Button>
          </Col>
          <Col lg={{ span: 4, offset: 7 }}>
            <div className="icons">
              <ProjectCardOption
                tooltip="Begin dezynfection"
                icon={faPlay}
                hoverColor="Green"
                onClick={() => beginDezynfection()}
                disabled={error !== undefined || isActive}
              />
              <ProjectCardOption
                tooltip="Cancel/restart dezynfection"
                icon={faStop}
                hoverColor="brown"
                onClick={() => endDezynfection()}
                disabled={error !== undefined}
              />
              <ProjectCardOption
                tooltip="Delete"
                icon={faTrash}
                onClick={() => onTrashClick(projectId)}
                hoverColor="red"
              />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
