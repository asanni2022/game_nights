import React, { Component, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { Dialog } from "primereact/dialog";
import { ColumnGroup } from "primereact/columngroup";
import { Row } from "primereact/row";
import { Container, Col } from "react-bootstrap";
import { Row as myRow } from "react-bootstrap";
import { Panel } from "primereact/panel";
import "./PendingInvitesGroups.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const PendingInvitesGroups = (props) => {
	// props.data = groupInvitations
	const [showMessage, setShowMessage] = useState(false);
	const [showAcceptedMessage, setShowAcceptedMessage] = useState(false);
	const [groupDetails, setGroupDetails] = useState(null);
	const [invitationDetails, setInvitationDetails] = useState([]);
	const [groupCode, setGroupCode] = useState(null);
	const nav = useNavigate();

	const showDetails = (invitationInfo) => {
		setGroupDetails(
			invitationInfo[0] +
				" invited you to join " +
				invitationInfo[1] +
				"!"
		);
		setInvitationDetails(invitationInfo);
		// console.log("group detail info: ", groupDetails);
		setShowMessage(true);
	};
	const hideDetails = () => {
		setShowMessage(false);
	};
	const hideAcceptedDetails = () => {
		setShowAcceptedMessage(false);
		window.location.reload();
	};
	const joinGroup = function (email, name, code) {
		axios
			.put("/group/join", { friend_email: email, code: code })
			.then((response) => {
				hideDetails();
				props.viewGroups();

				// console.log("join group response.data", response.data);
				if (response.data.success == "True") {
					// window.alert("Group joined!");
					setShowAcceptedMessage(true);
					props.setJoinGroupInformation([name, code]);

				} else {
					window.alert(`${response.data.reason}`);
				}
			});
	};
	const delineGroup = function (email, code) {
		axios
			.put("/group/decline", { friend_email: email, code: code })
			.then((response) => {
				hideDetails();
				props.viewGroups();
				setTimeout(() => {
					props.viewGroupInvitations();
					window.location.reload();
				}, 300);

				// console.log("decline group response.data", response.data);
				if (response.data.success == "True") {
					window.alert("Group invite declined");
				} else {
					window.alert(`${response.data.reason}`);
				}
			});
	};

	let invites = [];
	if (props.data) {
		for (let invitation of props.data) {
			// props.data = groupInvitations
			// console.log("invitation in props.data: ", invitation);
			let tempInvite = {
				groupName: invitation[1],
				details: (
					<Button onClick={() => showDetails(invitation)}>
						Show Details
					</Button>
				),
				invitation: invitation,
			};

			invites.push(tempInvite);
		}
	}
	const noInvites = [
		{
			groupName: "None",
		},
	];

	const handleAccept = () => {
		joinGroup(
			invitationDetails[0],
			invitationDetails[1],
			invitationDetails[2]
		);
		// window.location.replace("/#/groups/");

		// const endNav = "/groups/" + invitationDetails[2] + "/";
		// setTimeout(() => {
		// 	props.viewGroupInvitations();
		// 	window.location.reload();
		// 	// setTimeout(() => {
		// 	// 	nav(endNav);
		// 	// }, 600);
		// }, 400);
	};
	const dialogFooter = (
		<Container as={myRow} className="flex justify-content-center">
			<Col>
				{/* TODO: add accept logic */}
				<Button
					label="Accept"
					icon="pi pi-check"
					className="p-button-outlined"
					autoFocus
					onClick={() => handleAccept()}
				/>
			</Col>
			<Col></Col>
			<Col>
				{/* TODO: add decline logic */}
				<Button
					label="Decline"
					icon="pi pi-times"
					className="p-button-outlined"
					onClick={() =>
						delineGroup(invitationDetails[0], invitationDetails[2])
					}
				/>
			</Col>
		</Container>
	);

	const tableHeader = (
		<ColumnGroup>
			<Row>
				<Column header="Pending Group Invitations" colSpan={2} />
			</Row>
		</ColumnGroup>
	);

	return (
		<Container
			as={myRow}
			className="container-table-pending-invites-groups"
		>
			<Dialog
				visible={showMessage}
				onHide={hideDetails}
				showHeader={true}
				header="Invite Details"
				footer={dialogFooter}
				breakpoints={{ "960px": "80vw" }}
				style={{ width: "30vw" }}
			>
				<div className="flex align-items-center flex-column pt-6 px-3 field">
					<p style={{ lineHeight: 1.5 }}>{groupDetails}</p>
				</div>
			</Dialog>
			<Dialog
				visible={showAcceptedMessage}
				onHide={() => hideAcceptedDetails()}
				showHeader={true}
				header="Successfully joined group!"
				breakpoints={{ "960px": "80vw" }}
				style={{ width: "30vw" }}
			>
				<Button
					label="OK"
					onClick={() => hideAcceptedDetails()}
					className="p-button-outlined"
				></Button>
			</Dialog>
			<Panel
				header="Pending Group Invitations"
				style={{ width: "100%", margin: "0px" }}
			>
				<DataTable
					value={props.data ? invites : noInvites}
					style={{ width: "100%" }}
					// headerColumnGroup={tableHeader}
				>
					<Column field="groupName" />
					<Column field="details" />
				</DataTable>
			</Panel>
		</Container>
	);
};
