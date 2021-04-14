import { faPlay, faStop, faTrash } from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useState } from "react";
import { Button, Col, Container, ProgressBar, Row } from "react-bootstrap";
import { disinfectionServices } from "../../../../api/disinfectionServices";
import { planerService } from "../../../../api/planerServices";
import hubMethods from "../../../eventHub/constants";
import { SignalROperations } from "../../../eventHub/useSignalR";
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
  signalR: SignalROperations;
}

export default function ProjectCard(props: ProjectCardProps) {
  const {
    title,
    projectId,
    onClick,
    disinfectionTime,
    error,
    refresh,
    signalR,
  } = props;

  const [completedPercentag, setCompletedPercentage] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(disinfectionTime);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const unsubscribe = signalR.subscribe(
      hubMethods.elapsedTime,
      getCurrentProgress
    );

    function getCurrentProgress(time: number, id: string, completed: boolean) {
      if (parseInt(id) === projectId) {
        setIsActive(!completed);
        setElapsedTime(time);
      }
    }

    return () => unsubscribe();
  }, [signalR, projectId]);

  useEffect(() => {
    let percentage = (elapsedTime / (disinfectionTime * 60)) * 100;
    setCompletedPercentage(percentage);
    setTimeRemaining(Math.ceil(disinfectionTime - elapsedTime / 60));
    if (percentage >= 100) {
      setIsCompleted(true);
    }
  }, [elapsedTime, disinfectionTime]);

  function disinfectionMessage(time: number) {
    let timeAsString = timeNumberToReadableString(time);
    let message = (
      <>
        Optmial disinfection time: <b>{timeAsString}</b>
      </>
    );
    return message;
  }

  function beginDisinfection() {
    disinfectionServices.beginDisinfection({
      id: projectId,
      time: disinfectionTime * 60,
    });
  }

  function endDisinfection() {
    disinfectionServices
      .endDisinfection({ id: projectId })
      .then(() => setIsActive(false));
    setElapsedTime(0);
    setIsCompleted(false);
  }

  function onTrashClick(id: number) {
    planerService
      .deleteById(id)
      .then(() => {
        endDisinfection();
        refresh();
      })
      .catch(() => {});
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
            <div id="text-content">
              {error ?? disinfectionMessage(disinfectionTime)}
            </div>
          </Col>
          <Col lg={{ span: 5, offset: 1 }}>
            {!error && (
              <div id="text-content">
                Time remaining:{" "}
                <b>{timeNumberToReadableString(timeRemaining)}</b>
              </div>
            )}
          </Col>
        </Row>
        <Row style={{ marginTop: "10px" }}>
          <Col lg={2}>
            <div className="button-wrapper">
              <Button
                onClick={() => onClick(projectId)}
                variant="warning"
                active={isActive}
                disabled={isActive}
              >
                Modify
              </Button>
            </div>
          </Col>
          <Col lg={{ span: 3, offset: 7 }}>
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
