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
            <Image alt="logo" src="/images/smLogo.png" style={{ width: '100px', height: '100px', marginRight: '30px' }} />
          </Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto Sedgwick">
            <Link passHref href="/orders/new">
              <Nav.Link className="large">NEW</Nav.Link>
            </Link>
            <Link passHref href="/orders">
              <Nav.Link className="large">ORDERS</Nav.Link>
            </Link>
            <Link passHref href="/revenue">
              <Nav.Link className="large">REVENUE</Nav.Link>
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
