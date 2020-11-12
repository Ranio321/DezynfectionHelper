import React from "react";
import { Nav, Navbar } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import "./TopNavBar.scss";
interface TopNavBarProps {}

export default function TopNavbar(props: TopNavBarProps) {
  return (
    <Navbar className="topNavBar" variant="dark">
      <Navbar.Brand>Dezynfection Helper</Navbar.Brand>
      <Nav className="mr-auto">
        <Nav.Link>My projects</Nav.Link>
        <Nav.Link>Features</Nav.Link>
        <Nav.Link>Pricing</Nav.Link>
      </Nav>
    </Navbar>
  );
}
