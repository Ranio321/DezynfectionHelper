import React, { useEffect, useState } from "react";
import { PlanerItemsDto } from "../../../api/models";
import { planerService } from "../../../api/PlanerServices";
import { PlanerItems } from "../../../Planer/PlanerTypes";
import ProjectCard from "./projectCard/ProjectCard";
import "./ProjectList.scss";
interface ProjectListProps {}

export default function ProjectList(props: ProjectListProps) {
  const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 9, 1, 1, 1, 1, 1, 1, 1, 1, 1];
  const [projects, setProjects] = useState<PlanerItemsDto[]>();

  useEffect(() => {
    planerService
      .getAll()
      .then((data) => setProjects(data))
      .catch(() => console.log("API ERROR"));
  }, []);

  return (
    <div className="projectList">
      {projects?.map((el) => {
        return <ProjectCard key={el.id} title={el.name} projectId={el.id} />;
      })}
    </div>
  );
}
