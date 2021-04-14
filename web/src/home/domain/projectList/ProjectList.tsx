import React from "react";
import { useHistory } from "react-router-dom";
import { PlanerItemsDto } from "../../../api/models";
import { planerService } from "../../../api/planerServices";
import { EmptyViewForArray } from "../../../common/EmptyViewForArray";
import { LoadingArea } from "../../../common/LoadingArea";
import { useDataLoader } from "../../../planer/hooks/useDataLoader";
import { urls } from "../../eventHub/urls";
import useSignalR from "../../eventHub/useSignalR";
import { calculateDisinfectionTime } from "../../helpers/calculateDisinfectionTime";
import ProjectCard from "./projectCard/ProjectCard";
import "./ProjectList.scss";
interface ProjectListProps {}

export default function ProjectList(props: ProjectListProps) {
  const history = useHistory();
  const signalR = useSignalR(urls.disinfectionSimulator);
  const [projects, promise, refresh] = useDataLoader<PlanerItemsDto[]>(() =>
    planerService.getAll()
  );

  function onButtonClick(id: number) {
    history.push("/planer/" + id);
  }

  function generateDisinfectionMessage(
    object: PlanerItemsDto
  ): string | undefined {
    if (!object.room) {
      return "Disinfection faild. First you have to create room.";
    }
    if (!object.objects.find((item) => item.type.includes("Lamp"))) {
      return "Disinfection faild. First you have to add disinfection lamps";
    }
  }

  return (
    <div className="projectList">
      <LoadingArea height="100px" width="100px" promise={promise}>
        <EmptyViewForArray items={projects}>
          {projects &&
            projects?.map((el) => {
              calculateDisinfectionTime(el);
              return (
                <ProjectCard
                  key={el.id}
                  title={el.name}
                  projectId={el.id}
                  onClick={onButtonClick}
                  refresh={refresh}
                  disinfectionTime={calculateDisinfectionTime(el)}
                  error={generateDisinfectionMessage(el)}
                  signalR={signalR}
                />
              );
            })}
        </EmptyViewForArray>
      </LoadingArea>
    </div>
  );
}
