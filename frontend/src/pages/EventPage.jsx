import { EventsTable } from "../components/Tables/EventsTable/EventsTable";
import Calendar from "../components/Calendar/Calendar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import PendingInvitesEvents from "../components/Tables/PendingInvitesEvents/PendingInvitesEvents";
import { useEffect, useState } from "react";
import axios from 'axios'

export default function EventPage({ data }) {
	const navigate = useNavigate();
	const [eventInvitation, setEventInvitation] = useState(null);
	
	const viewEventInvitations = () => {
		axios.get("/eventrequest/view").then((response) => {
		console.log(response.data.event_requests)
			if (response.data.success === "True") {
				let invites = 
					response && response.data && response.data.event_requests;
				setEventInvitation(invites);
			}	
		});
	}

	useEffect(() => {
		viewEventInvitations();
	}, [])
	
	const handleClick = () => {
		navigate("/events/create");
	};
	return (
		<Container>
			<h1 style={{ margin: "20px" }}>Scheduled Events</h1>
			<hr />
			<Row>
				<Col md={4}>
					<div>
						<EventsTable />
						<Button
							onClick={handleClick}
							icon="pi pi-plus"
							label="Create Event"
							className="btn-create-event"
						/>
						{eventInvitation ? (
							<PendingInvitesEvents data={eventInvitation} />
						) : null
						}
					</div>
				</Col>
				<Col md={8}>
					<div>
						<Calendar data={data} />
					</div>
				</Col>
			</Row>
		</Container>
	);
}
