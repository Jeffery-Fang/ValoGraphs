import { Container, Navbar, Offcanvas, Nav, NavDropdown, Form, Button, Stack, Dropdown } from 'react-bootstrap'
import { SiValorant } from 'react-icons/si'

/**
 * handlerMap - A dictionary mapping text to some action that will be done when the option is selected
 * gameModes - A list of available game modes for the 'Change Game Mode option
 * regions - A list of regions that are supported
 * currentRegion - The current selected region
 */
interface HeaderProps {
    handlerMap: { [option: string]: any }
    gameModes: string[]
    regions: string[]
    currentRegion: string
    handleChangeRegion: (region: string) => void
}

export default function Header({ handlerMap, gameModes, regions, currentRegion, handleChangeRegion }: HeaderProps) {
    const navOptions = Object.keys(handlerMap).map((text: string, index: number) => {
        if (text === 'View Profile Page') {
            return (
                <NavDropdown title={text} key={index}>
                    <Form className="d-flex pt-0 px-2">
                        <Form.Control
                            type="search"
                            spellCheck="false"
                            placeholder="Playername #Tag"
                            className="me-2"
                            aria-label="Search"
                            id="profileSearchInput"
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    e.preventDefault()
                                    handlerMap[text](currentRegion)
                                }
                            }}
                        />
                        <Button
                            variant="outline-danger"
                            onClick={() => {
                                handlerMap[text](currentRegion)
                            }}
                        >
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
            <Navbar className="w-100" expand={false} variant="dark" bg="black">
                <Container fluid>
                    <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${false}`} />
                    <Navbar.Brand className="mx-auto">
                        <Stack
                            direction="horizontal"
                            style={{
                                fontFamily: 'Courier New, monospace',
                                color: 'white',
                                fontSize: '15px',
                            }}
                            gap={1}
                        >
                            <SiValorant size={45} style={{ fill: '#FF4655' }} />
                            <h1 className="my-auto ps-2">ValoGraphs</h1>
                        </Stack>
                    </Navbar.Brand>
                    {regions.length > 0 ? (
                        <Dropdown
                            style={{
                                fontFamily: 'Courier New, monospace',
                                color: 'white',
                            }}
                        >
                            <Dropdown.Toggle className="bg-black border border-dark" id="dropdown-basic">
                                {currentRegion === 'LATAM' ? 'LT' : currentRegion}
                            </Dropdown.Toggle>
                            <Dropdown.Menu className="bg-black border border-dark" align={'end'}>
                                {regions.map((region: string, index: number) => {
                                    return (
                                        <Dropdown.Item
                                            key={index}
                                            className="text-secondary"
                                            onClick={() => {
                                                handleChangeRegion(region)
                                            }}
                                        >
                                            {region}
                                        </Dropdown.Item>
                                    )
                                })}
                            </Dropdown.Menu>
                        </Dropdown>
                    ) : (
                        <Dropdown className="invisible px-1">
                            <Dropdown.Toggle
                                className="bg-black border border-dark"
                                id="dropdown-basic"
                            ></Dropdown.Toggle>
                        </Dropdown>
                    )}
                </Container>
                <Navbar.Offcanvas
                    className="p-2"
                    style={{
                        minWidth: '20%',
                        fontFamily: 'Courier New, monospace',
                        color: 'white',
                        fontSize: '16px',
                    }}
                    id={`offcanvasNavbar-expand-${false}`}
                    aria-labelledby={`offcanvasNavbarLabel-expand-${false}`}
                    placement="start"
                    data-bs-theme="dark"
                >
                    <Offcanvas.Header closeButton></Offcanvas.Header>
                    <Offcanvas.Body className="pt-0">
                        <Nav> {navOptions}</Nav>
                    </Offcanvas.Body>
                </Navbar.Offcanvas>
            </Navbar>
        </>
    )
}
