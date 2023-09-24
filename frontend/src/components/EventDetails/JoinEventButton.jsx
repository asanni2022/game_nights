import { useState } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Container, Col } from "react-bootstrap";
import { Row as myRow } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function JoinEventButton({ eventDetail, attending, setJoinEventInformation}) {
	const [showMessage, setShowMessage] = useState(false);
	const nav = useNavigate();

	const joinEvent = function () {
		let event_id = eventDetail.id;
		let name = eventDetail.name
		let code = eventDetail.code
		axios.post(`/event/join/${eventDetail.code}`).then((response) => {
			console.log("join event response.data", response.data);
			if(eventDetail.chat_creation===true) {
				setJoinEventInformation([name, code])
				nav("/chatroom");
			}
			nav("/events/");
		});
	};

	const hideDetails = () => {
		setShowMessage(false);
	};

	const dialogFooter = (
		<Container as={myRow} className="flex justify-content-center">
			<Col>
				<Button
					label="Join"
					icon="pi pi-user-plus"
					className="p-button-outlined"
					autoFocus
					onClick={() => joinEvent()}
				/>
			</Col>
			<Col></Col>
			<Col>
				<Button
					label="No"
					icon="pi pi-times"
					className="p-button-outlined"
					onClick={() => hideDetails()}
				/>
			</Col>
		</Container>
	);

	return (
		<>
			<Button
				label="Join"
				icon="pi pi-user-plus"
				className="p-button-text"
				onClick={() => {
					setShowMessage(true);
				}}
			/>
			{/* <Button onClick={() => showDetails(invitation)}>Show Details</Button> */}
			<Dialog
				visible={showMessage}
				onHide={hideDetails}
				showHeader={true}
				header="Join Event?"
				footer={dialogFooter}
				breakpoints={{ "960px": "80vw" }}
				style={{ width: "30vw" }}
			>
				<div className="flex align-items-center flex-column pt-6 px-3 field">
					<p style={{ lineHeight: 1.5 }}>
						Join the event?
					</p>
				</div>
			</Dialog>
		</>
	);
}

export default JoinEventButton;
