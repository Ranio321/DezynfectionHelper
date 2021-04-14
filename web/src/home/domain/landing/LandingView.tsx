import React from "react";
import { LoginModal } from "../login/LoginModal";
import TopNavbar from "../navBar/TopNavBar";
import ProjectList from "../projectList/ProjectList";
import "../../../../node_modules/bootstrap/dist/css/bootstrap.css";
import { Route } from "react-router-dom";
import { RestircedArea } from "../../../common/RestricedArea";
interface LandingViewProps {}

export default function LandingView(props: LandingViewProps) {
  return (
    <>
      <TopNavbar />
      <RestircedArea redirectTo="/home/login">
        <Route path="/home/projects" component={ProjectList} />
      </RestircedArea>
      <Route path="/home/login" component={LoginModal} />
    </>
  );
}
