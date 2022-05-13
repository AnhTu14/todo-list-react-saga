import * as React from "react";
import { Navbar, Container, Nav, NavDropdown, Button } from "react-bootstrap";
import { useAppDispatch } from "app/hooks";
import { authActions } from "features/auth/authSlice";
export interface HeaderProps {}

export default function Header() {
  const dispatch = useAppDispatch();

  const handleLogoutClick = () => {
    dispatch(authActions.logout());
  };
  return (
    <div className="">
      <Navbar collapseOnSelect expand="lg" variant="dark">
        <Navbar.Brand href="#home">React</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Button onClick={handleLogoutClick}>Logout</Button>
      </Navbar>
    </div>
  );
}
