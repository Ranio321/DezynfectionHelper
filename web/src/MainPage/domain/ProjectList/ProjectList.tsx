import React from "react";
import { useHistory } from "react-router-dom";
import { PlanerItemsDto } from "../../../api/models";
import { planerService } from "../../../api/PlanerServices";
import { EmptyViewForArray } from "../../../common/EmptyViewForArray";
import { LoadingArea } from "../../../common/LoadingArea";
import { useDataLoader } from "../../../Planer/Hooks/useDataLoader";
import { calculateDezynfectionTime } from "../../helpers/calculateDezynfectionTime";
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

  function generateDezynfectionMessage(
    object: PlanerItemsDto
  ): string | undefined {
    if (!object.room) {
      return "Dezynfection faild. First you have to create room.";
    }
    if (!object.objects.find((item) => item.type.includes("Lamp"))) {
      return "Dezynfection faild. First you have to add dezynfection lamps";
    }

    // let time = calculateDezynfectionTime(object);
    // let timeAsString = timeNumberToReadableString(time);
    // message = "Optmial dezynfection time: " + timeAsString;
    // return message;
  }

  return (
    <LoadingArea height="100px" width="100px" promise={promise}>
      <EmptyViewForArray items={projects}>
        {projects &&
          projects?.map((el) => {
            calculateDezynfectionTime(el);
            return (
              <ProjectCard
                key={el.id}
                title={el.name}
                projectId={el.id}
                onClick={onButtonClick}
                refresh={refresh}
                dezynfectionTime={calculateDezynfectionTime(el)}
                error={generateDezynfectionMessage(el)}
              />
            );
          })}
      </EmptyViewForArray>
    </LoadingArea>
  );
}
