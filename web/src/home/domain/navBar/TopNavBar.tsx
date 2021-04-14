import React from "react";
import { Button, Nav, Navbar } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { RestircedArea } from "../../../common/RestricedArea";
import { useAuth } from "../../../users/authorization";
import "./TopNavBar.scss";
interface TopNavBarProps {}

export default function TopNavbar(props: TopNavBarProps) {
  const { user, logout } = useAuth();
  const history = useHistory();

  function onSignIn() {
    history.push({
      pathname: "/home/login",
    });
  }

  function onLogout() {
    logout();
    history.push({
      pathname: "/home",
    });
  }

  function onMyPorjectsClick() {
    history.push({
      pathname: "/home/projects",
    });
  }

  function onPlanerClick() {
    history.push({
      pathname: "/planer",
    });
  }

  return (
    <Navbar className="top-navbar" variant="dark">
      <Navbar.Brand>Disinfection Helper</Navbar.Brand>

      <Nav className="mr-auto">
        <RestircedArea redirectTo="/home">
          <Nav.Link onClick={onMyPorjectsClick}>My projects</Nav.Link>
        </RestircedArea>
        <RestircedArea redirectTo="/home">
          <Nav.Link onClick={onPlanerClick}>Create plan</Nav.Link>
        </RestircedArea>
      </Nav>

      {!user ? (
        <Button variant="info" className="loginButton" onClick={onSignIn}>
          Sign in
        </Button>
      ) : (
        <Button variant="info" className="loginButton" onClick={onLogout}>
          Logout
        </Button>
      )}
    </Navbar>
  );
}
