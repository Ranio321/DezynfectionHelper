import { text } from "@fortawesome/fontawesome-svg-core";
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
    </div>
  );
}
