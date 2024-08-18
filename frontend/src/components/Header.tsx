import { Container, Navbar, Offcanvas, Nav, NavDropdown, Form, Button } from 'react-bootstrap'
import { TbBrandValorant } from 'react-icons/tb'
interface HeaderProps {
    handlerMap: { [option: string]: any }
    gameModes: string[]
}

export default function Header({ handlerMap, gameModes }: HeaderProps) {
    const navOptions = Object.keys(handlerMap).map((text: string, index: number) => {
        if (text === 'View Profile Page') {
            return (
                <NavDropdown title={text} key={index}>
                    <Form className="d-flex pt-0 px-2">
                        <Form.Control
                            type="search"
                            placeholder="Playername #Tag"
                            className="me-2"
                            aria-label="Search"
                            id="profileSearchInput"
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    e.preventDefault()
                                    handlerMap[text]()
                                }
                            }}
                        />
                        <Button variant="outline-success" onClick={handlerMap[text]}>
                            Search
                        </Button>
                    </Form>
                </NavDropdown>
            )
        } else if (text === 'Change Game Mode') {
            return (
                <NavDropdown title={text} id={`offcanvasNavbarDropdown-expand-${false}`} key={index}>
                    {gameModes.map((mode: string, index: number) => {
                        return (
                            <NavDropdown.Item
                                key={index}
                                onClick={() => {
                                    handlerMap[text](mode)
                                }}
                            >
                                {mode}
                            </NavDropdown.Item>
                        )
                    })}
                </NavDropdown>
            )
        } else if (text === 'Export Graphs') {
            return (
                <Nav.Link onClick={handlerMap[text]} key={index}>
                    {text}
                </Nav.Link>
            )
        } else {
            return (
                <Nav.Link href={handlerMap[text]} key={index}>
                    {text}
                </Nav.Link>
            )
        }
    })

    return (
        <>
            <Navbar className="p-0" expand={false} variant="dark" bg="dark">
                <Container fluid className="p-2">
                    <div>
                        <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${false}`} />
                    </div>
                    <Navbar.Brand>
                        <Container fluid className="d-flex">
                            <TbBrandValorant size={45} />
                            <h1 className="font-monospace ps-2">ValoGraphs</h1>
                        </Container>
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
                        <Nav className="justify-content-end flex-grow-1 pe-3">{navOptions}</Nav>
                    </Offcanvas.Body>
                </Navbar.Offcanvas>
            </Navbar>
        </>
    )
}
