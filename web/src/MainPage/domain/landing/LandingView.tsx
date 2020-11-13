import React from "react";
import TopNavbar from "../navBar/TopNavBar";
import ProjectList from "../ProjectList/ProjectList";
import "./LandingView.scss";
interface LandingViewProps {}

export default function LandingView(props: LandingViewProps) {
  return (
    <>
      <TopNavbar />
      <div className="projectList">
        <ProjectList />
      </div>
    </>
  );
}
