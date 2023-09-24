import { Button } from "primereact/button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useNavigate } from "react-router-dom";

export default function LoginNeededPage(){

    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/allevents/")
    }

    const handleLoginClick = () => {
        navigate("/login/")
    }

    return (
        <Container style={{'max-width': '50%'}}>
        <Row>
        <h1>Please Sign Up or Log In to access event details!</h1>
        </Row>
        <Row className="justify-content-md-center" style={{'margin-top': '30px'}}>
            <Button
                label="Take me back to events!"
                type="button"
                className="mr-3 p-button"
                style={{ margin: "15px", 'max-width': '30%'}}
                onClick={handleClick}
            />
        </Row>
            <Row className="justify-content-md-center" style={{'margin-top': '10px'}}>
            <Button
                label="Log In / Sign Up"
                type="button"
                className="mr-3 p-button"
                style={{ margin: "15px", 'max-width': '30%'}}
                onClick={handleLoginClick}
            />
        </Row>
             
        </Container>
    )
}