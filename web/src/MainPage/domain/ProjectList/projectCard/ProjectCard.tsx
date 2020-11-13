import { text } from "@fortawesome/fontawesome-svg-core";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import "./ProjectCard.scss";
interface ProjectCardProps {
  title?: string;
  projectId: number;
}

export default function ProjectCard(props: ProjectCardProps) {
  const { title, projectId } = props;
  return (
    <div className="projectCard">
      <p className="item-title">{title}</p>
      <div className="binIconDiv">
        <FontAwesomeIcon className="binIcon" size="lg" icon={faTrash} />
      </div>
    </div>
  );
}
