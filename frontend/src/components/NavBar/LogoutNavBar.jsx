import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import logo from '../../assets/Images/logo.png'

import "./NavBar.css"

export default function LogoutNavBar() {
  
  return (
    <Navbar className="fixed-top navbar-color" variant="dark" expand="lg">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="m-auto width-100">
          <Container>
          <Row style={{'font-size': '20px'}}>
            <Col style={{'margin-top': '10px'}}>
              <Nav.Link className="blue-font" href="#/">Home</Nav.Link>
            </Col>
            <Col>
              <Navbar.Brand href="#/">
                <img src={logo} alt="logo" width="300px"></img>
              </Navbar.Brand>
            </Col>
            <Col style={{'margin-top': '10px'}}>
              <Nav.Link className="blue-font" href="#/allevents">Search Events</Nav.Link>
            </Col>
          </Row>
          </Container>
          </Nav>
        </Navbar.Collapse>
    </Navbar>
  );
}