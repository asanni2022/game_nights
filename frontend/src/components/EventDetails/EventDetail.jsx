import "./EventDetail.css";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
import { Button } from "react-bootstrap";
import GameModal from "../Games/GameModal";

export const EventDetails = () => {
	let { eventId } = useParams();

	const [eventDetail, setEventDetail] = useState(null);

	useEffect(() => {
		axios.get(`/userevents/${eventId}`).then((response) => {
			// console.log('response data',response)
			setEventDetail(response.data);
		});
	}, []);

    return(
        <div>
            {   eventDetail
            ? <div>
                <h1>{eventDetail[0].fields.name}</h1>
                <DataTable value={eventDetail} responsiveLayout="scroll">
                    <Column field='fields.code' header="Code"></Column>
                    <Column field='fields.address_1' header="Address 1"></Column>
                    <Column field='fields.address_2' header="Address 2"></Column>
                    <Column field='fields.city' header="City"></Column>
                    <Column field='fields.state' header="State"></Column>
                    <Column field='fields.zip_code' header="Zip Code"></Column>
                    <Column field='fields.max_attendees' header="Max Attendees"></Column>
                </DataTable>
                <p>{eventDetail[0].fields.description}</p>
                <Container>
                    <Row>
                        {eventDetail[0].fields.games.map((game)=>{return <Col className='gamecards'><GameModal gameName={game} /></Col>})}
                    </Row>


                </Container>

                </div>
            : <h1>nothing here</h1>


            }

        </div>
    )
}
