import { faPlay, faStop, faTrash } from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useState } from "react";
import { Button, Col, Container, ProgressBar, Row } from "react-bootstrap";
import { disinfectionServices } from "../../../../api/disinfectionServices";
import { planerService } from "../../../../api/PlanerServices";
import { EventHubOperations } from "../../../eventHub/EventHub";
import { timeNumberToReadableString } from "../../../helpers/timeNumberToReadableString";
import "./ProjectCard.scss";
import ProjectCardOption from "./ProjectCardOption";
interface ProjectCardProps {
  title?: string;
  projectId: number;
  onClick: (id: number) => any;
  disinfectionTime: number;
  error?: string;
  refresh: () => any;
  eventHub: EventHubOperations;
}

export default function ProjectCard(props: ProjectCardProps) {
  const {
    title,
    projectId,
    onClick,
    disinfectionTime,
    error,
    refresh,
    eventHub,
  } = props;

  const [completedPercentag, setCompletedPercentage] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(disinfectionTime);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isActive, setIsActive] = useState(false);

  eventHub.subscribe("elapsedTime", getCurrentProgress);

  useEffect(() => {
    let percentage = (elapsedTime / (disinfectionTime * 60)) * 100;
    setCompletedPercentage(percentage);
    setTimeRemaining(Math.ceil(disinfectionTime - elapsedTime / 60));
    if (percentage >= 100) {
      setIsCompleted(true);
    }
  }, [elapsedTime]);

  function disinfectionMessage(time: number) {
    let timeAsString = timeNumberToReadableString(time);
    let message = (
      <>
        Optmial disinfection time: <b>{timeAsString}</b>
      </>
    );
    return message;
  }

  function getCurrentProgress(time: number, id: number, completed: boolean) {
    if (id == projectId) {
      setIsActive(!completed);
      setElapsedTime(time);
    }
  }

  function beginDisinfection() {
    disinfectionServices.beginDisinfection({
      id: projectId,
      time: disinfectionTime * 60,
    });
  }

  function endDisinfection() {
    disinfectionServices
      .endDisinfection(projectId)
      .then(() => setIsActive(false));
    setElapsedTime(0);
    setIsCompleted(false);
  }

  function onTrashClick(id: number) {
    planerService
      .deleteById(id)
      .then(() => refresh())
      .catch(() => {});
    disinfectionServices
      .endDisinfection(projectId)
      .then(() => setIsActive(false));
  }

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
              {error ? error : disinfectionMessage(disinfectionTime)}
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
                tooltip="Begin disinfection"
                icon={faPlay}
                hoverColor="Green"
                onClick={() => beginDisinfection()}
                disabled={error !== undefined || isActive}
              />
              <ProjectCardOption
                tooltip="Cancel/restart disinfection"
                icon={faStop}
                hoverColor="brown"
                onClick={() => endDisinfection()}
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
