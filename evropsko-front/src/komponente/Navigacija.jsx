import React from 'react';
import {Container, Nav, Navbar} from "react-bootstrap";

const Navigacija = () => {

    const token = window.sessionStorage.getItem('token');
    const ulogovan = token !== null;

    const user = JSON.parse(window.sessionStorage.getItem('user'));

    const admin = user !== null && user.role === 'admin';


    return (
        <>
            <Navbar className="bg-body-tertiary">
                <Container>
                    <Navbar.Brand href="/">Evropsko prvenstvo</Navbar.Brand>
                    <Navbar.Toggle />
                    <Nav className="me-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/drzave">Drzave</Nav.Link>
                        {
                            ulogovan && <Nav.Link href="/rezultati">Rezultati</Nav.Link>
                        }
                        {
                            ulogovan && <Nav.Link href="/tabele">Tabele</Nav.Link>
                        }
                        {
                            admin && <Nav.Link href="/admin">Admin</Nav.Link>
                        }
                        {
                            ulogovan && <Nav.Link onClick={() => {
                                window.sessionStorage.removeItem('token');
                                window.sessionStorage.removeItem('user');
                                window.location = '/';
                            }} href="#">Logout</Nav.Link>
                        }

                        {
                            !ulogovan && <Nav.Link href="/login">Login</Nav.Link>
                        }
                    </Nav>
                    {
                        ulogovan && <Navbar.Collapse className="justify-content-end">
                            <Navbar.Text>
                                Ulogovani korisnik: {user.email}
                            </Navbar.Text>
                        </Navbar.Collapse>
                    }
                </Container>
            </Navbar>
        </>
    );
};

export default Navigacija;