import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/Images/logo.png";
import { Badge } from "primereact/badge";
import { useState, useEffect } from "react";

import "./NavBar.css";

export default function LoginNavBar({ client, whoAmI }) {
	let navigate = useNavigate();
	const [groupInvitations, setGroupInvitations] = useState(null);
	const [numGroupInvites, setNumGroupInvites] = useState(0);
	const [eventInvitations, setEventInvitations] = useState(null);
	const [numEventInvites, setNumEventInvites] = useState(0);
	// const client = props.client;
	// console.log("client: ", client);
	const viewGroupInvitations = function () {
		axios.get("/group/request/view").then((response) => {
			// console.log("view group invitations response.data", response.data);
			if (response.data.success == "True") {
				let new_invitations =
					response && response.data && response.data.group_requests;
				setGroupInvitations(new_invitations);
				setNumGroupInvites(new_invitations.length);
				console.log("new group invites: ", new_invitations);
				console.log("num group invites: ", new_invitations.length);
			}
			// else{
			// 	console.log('')
			// }
		});
	};

	const viewEventInvitations = () => {
		axios.get("/eventrequest/view").then((response) => {
			if (response.data.success == "True") {
				console.log(response.data);
				let new_event_invitations =
					response && response.data && response.data.event_requests;
				setEventInvitations(new_event_invitations);
				setNumEventInvites(new_event_invitations.length);
				console.log("new event invites: ", new_event_invitations);
				console.log("num event invites: ", numEventInvites);
			}
		});
	};

	useEffect(() => {
		viewGroupInvitations();
		viewEventInvitations();
		whoAmI();

		setTimeout(() => {
			// setShowChat(true);
			// console.log("TIMEOUT");
		}, 700);
	}, []);

	const logout = function (event) {
		event.preventDefault();
		if (client) {
			console.log("logout client should exist", client);
			client.disconnectUser();
			console.log("logout client should not exist", client);
		}
		axios
			.post("/logout")
			.then((response) => {
				navigate("/");
				window.location.reload();
			})
			.catch((error) => {});
	};

	return (
		<Navbar className="fixed-top navbar-color" variant="dark" expand="lg">
			<Container>
				<Navbar.Brand href="#/">
					<img src={logo} alt="logo" width="300px"></img>
				</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="m-auto width-100">
						<Container>
							<Row style={{ "font-size": "20px" }}>
								<Col>
									<Nav.Link href="#/chatroom">
										Chatroom
									</Nav.Link>
								</Col>
								<Col>
									<Nav.Link href="#/groups">
										Your Groups{" "}
										{numGroupInvites > 0 ? (
											<Badge
												value={numGroupInvites}
											></Badge>
										) : null}
									</Nav.Link>
								</Col>
								<Col>
									<NavDropdown
										title="Events "
										id="basic-nav-dropdown"
									>
										<NavDropdown.Item
											className="dropdown-text"
											href="#/events"
										>
											Your Events{" "}
											{numEventInvites > 0 ? (
												<Badge
													value={numEventInvites}
												></Badge>
											) : null}
										</NavDropdown.Item>
										<NavDropdown.Item
											className="dropdown-text"
											href="#/allevents"
										>
											Search Events
										</NavDropdown.Item>
										<NavDropdown.Item
											className="dropdown-text"
											href="#/events/create"
										>
											Create Event
										</NavDropdown.Item>
									</NavDropdown>
								</Col>
								<Col>
									<NavDropdown
										title="Account"
										id="basic-nav-dropdown"
									>
										<NavDropdown.Item
											className="dropdown-text"
											href="#/account"
										>
											Account Details
										</NavDropdown.Item>
										<NavDropdown.Item
											className="dropdown-text"
											onClick={logout}
										>
											Logout
										</NavDropdown.Item>
									</NavDropdown>
								</Col>
							</Row>
						</Container>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
}
