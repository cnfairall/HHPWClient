/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Link from 'next/link';
import {
  Navbar,
  Nav,
  Dropdown,
  Container,
  Image,
} from 'react-bootstrap';
import { signOut } from '../utils/auth';

export default function NavBar() {
  return (
    <Navbar id="navbar" collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Link passHref href="/">
          <Navbar.Brand>
            <Image alt="logo" src="/images/logo.png" style={{ width: '100px', height: '100px' }} />
          </Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto large">
            <Link passHref href="/orders/new">
              <Nav.Link>NEW</Nav.Link>
            </Link>
            <Link passHref href="/orders">
              <Nav.Link>ORDERS</Nav.Link>
            </Link>
            <Link passHref href="/revenue">
              <Nav.Link>REVENUE</Nav.Link>
            </Link>
          </Nav>
        </Navbar.Collapse>
        <Dropdown align="end">
          <Dropdown.Toggle id="user-menu" className="border-none bg-transparent">
            <Image roundedCircle src="/images/user.png" alt="user" style={{ width: '80px', height: '80px' }} />
          </Dropdown.Toggle>
          <Dropdown.Menu className="rounded-sm">
            <Dropdown.Item onClick={signOut}>Sign Out</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Container>
    </Navbar>
  );
}
