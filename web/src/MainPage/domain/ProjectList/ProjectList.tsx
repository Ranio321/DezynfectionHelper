import React, { useEffect, useState } from "react";
import { PlanerItemsDto } from "../../../api/models";
import { planerService } from "../../../api/PlanerServices";
import { EmptyViewForArray } from "../../../common/EmptyViewForArray";
import { LoadingArea } from "../../../common/LoadingArea";
import { useDataLoader } from "../../../Planer/Hooks/useDataLoader";
import { PlanerItems } from "../../../Planer/PlanerTypes";
import ProjectCard from "./projectCard/ProjectCard";
import "./ProjectList.scss";
interface ProjectListProps {}

export default function ProjectList(props: ProjectListProps) {
  const [projects, promise] = useDataLoader<PlanerItemsDto[]>(() =>
    planerService.getAll()
  );
  const empty: any[] = [];

  return (
    <LoadingArea height="100px" width="100px" promise={promise}>
      <EmptyViewForArray items={projects}>
        {projects?.map((el) => {
          return <ProjectCard key={el.id} title={el.name} projectId={el.id} />;
        })}
      </EmptyViewForArray>
    </LoadingArea>
  );
}
