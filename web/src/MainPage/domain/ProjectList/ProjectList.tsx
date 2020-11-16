import React from "react";
import { useHistory } from "react-router-dom";
import { PlanerItemsDto } from "../../../api/models";
import { planerService } from "../../../api/PlanerServices";
import { EmptyViewForArray } from "../../../common/EmptyViewForArray";
import { LoadingArea } from "../../../common/LoadingArea";
import { useDataLoader } from "../../../Planer/Hooks/useDataLoader";
import ProjectCard from "./projectCard/ProjectCard";
import "./ProjectList.scss";
interface ProjectListProps {}

export default function ProjectList(props: ProjectListProps) {
  const history = useHistory();
  const [projects, promise, refresh] = useDataLoader<PlanerItemsDto[]>(() =>
    planerService.getAll()
  );

  function onButtonClick(id: number) {
    history.push("/planer/" + id);
  }

  function onTrashClick(id: number) {
    planerService
      .deleteById(id)
      .then(() => refresh())
      .catch(() => {});
  }

  return (
    <LoadingArea height="100px" width="100px" promise={promise}>
      <EmptyViewForArray items={projects}>
        {projects?.map((el) => {
          return (
            <ProjectCard
              key={el.id}
              title={el.name}
              projectId={el.id}
              onClick={onButtonClick}
              onTrashClick={onTrashClick}
            />
          );
        })}
      </EmptyViewForArray>
    </LoadingArea>
  );
}
