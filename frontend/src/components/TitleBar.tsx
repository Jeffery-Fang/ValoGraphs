import { Container, Navbar, Offcanvas, Nav, NavDropdown, Form, Button } from 'react-bootstrap'

function TitleBar() {
    return (
        <>
            <Navbar className="p-0" expand={false} variant="dark" bg="dark">
                <Container fluid className="p-2">
                    <div>
                        <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${false}`} />
                    </div>
                    <Navbar.Brand className="mx-auto font-monospace p-0">
                        <h1>ValoGraphs</h1>
                    </Navbar.Brand>
                    <div>
                        <Navbar.Toggle className="invisible" />
                    </div>
                </Container>
                <Navbar.Offcanvas
                    id={`offcanvasNavbar-expand-${false}`}
                    aria-labelledby={`offcanvasNavbarLabel-expand-${false}`}
                    placement="start"
                    data-bs-theme="dark"
                >
                    <Offcanvas.Header closeButton className="pt-4"></Offcanvas.Header>
                    <Offcanvas.Body className="pt-0">
                        <Nav className="justify-content-end flex-grow-1 pe-3">
                            <NavDropdown title="View Profile Page">
                                <Form className="d-flex pt-0 px-2">
                                    <Form.Control
                                        type="search"
                                        placeholder="Playername #Tag"
                                        className="me-2"
                                        aria-label="Search"
                                    />
                                    <Button variant="outline-success">Search</Button>
                                </Form>
                            </NavDropdown>
                            <NavDropdown title="Change Game Mode" id={`offcanvasNavbarDropdown-expand-${false}`}>
                                <NavDropdown.Item href="#action3">Unrated</NavDropdown.Item>
                                <NavDropdown.Item href="#action4">Competitive</NavDropdown.Item>
                                <NavDropdown.Item href="#action5">Team Deathmatch</NavDropdown.Item>
                            </NavDropdown>
                            <Nav.Link href="#action2">Export Graphs</Nav.Link>
                            <Nav.Link href="#action2">View GitHub Repository</Nav.Link>
                        </Nav>
                    </Offcanvas.Body>
                </Navbar.Offcanvas>
            </Navbar>
        </>
    )
}

export default TitleBar
