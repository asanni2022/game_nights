import React, { Component, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { Dialog } from "primereact/dialog";
import { ColumnGroup } from "primereact/columngroup";
import { Container, Row, Col } from "react-bootstrap";
import "./PendingInvitesEvents.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function PendingInvitesEvents(props) {

	const nav = useNavigate();

	const [showMessage, setShowMessage] = useState(false);
	const [inviteName, setInviteName] = useState(null)
	const [inviteCode, setInviteCode] = useState(null)
	const [inviteDetails, setInviteDetails] = useState(null)
	const [inviteId, setInviteId] = useState(null)

	const showDetails = (invitation) => {
		setInviteName(invitation[0])
		setInviteCode(invitation[1])
		setInviteDetails(invitation[2])
		setInviteId(invitation[3])
		setShowMessage(true);
	};

	const hideDetails = () => {
		setShowMessage(false);
		window.location.reload();
	};
	let invites = [];
	if (props.data) {
		for (let invitation of props.data) {
			// console.log("invitation in props.data: ", invitation);
			let tempInvite = {
				eventName: invitation[0],
				details: <Button onClick={() => showDetails(invitation)}>Show Details</Button>,
			};

			invites.push(tempInvite);
		}
	}
	
	const acceptInvite = () => {
		axios.post(`/event/join/${inviteCode}`).then((response) => {
			console.log(response)
			hideDetails()
		})
	}
		
	const declineInvite = () => {
		axios.delete(`/event/decline/${inviteId}`).then((response) => {
			console.log(response)
			hideDetails()
		})
	}

	const dialogFooter = (
		<div className="flex justify-content-center">
			<Row>
				<Col>
					{/* TODO: add accept logic */}
					<Button
						label="Accept"
						icon="pi pi-check"
						className="p-button-outlined"
						autoFocus
						onClick={acceptInvite}
					/>
				</Col>
				<Col></Col>
				<Col>
					{/* TODO: add decline login */}
					<Button
						label="Decline"
						icon="pi pi-times"
						className="p-button-outlined"
						onClick={declineInvite}
					/>
				</Col>
			</Row>
		</div>
	);
	const tableHeader = (
		<ColumnGroup>
			<Row>
				<Column header="Pending Event Invitations" colSpan={2} />
			</Row>
		</ColumnGroup>
	);
	return (
		<Container as={Row} className="container-table-pending-invites">
			<Dialog
				visible={showMessage}
				onHide={hideDetails}
				showHeader={true}
				header={inviteName}
				footer={dialogFooter}
				breakpoints={{ "960px": "80vw" }}
				style={{ width: "30vw" }}
			>
				<div className="flex align-items-center flex-column pt-6 px-3 field">
					<p style={{ lineHeight: 1.5 }}>{inviteDetails}</p>
          <Button label="More info" icon="pi pi-info-circle" className="p-button-text" onClick={()=>{nav(`/events/${inviteCode}`)}}/>
				</div>
			</Dialog>
			{/* TODO: decide whether we want 'no results found' or 'None' */}
			<DataTable value={invites} headerColumnGroup={tableHeader}>
				<Column field="eventName" />
				<Column field="details" />
			</DataTable>
		</Container>
	);
}
