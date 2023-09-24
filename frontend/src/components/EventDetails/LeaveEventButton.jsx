import {useState } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Container, Col } from "react-bootstrap";
import { Row as myRow } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";


export default function LeaveEventButton({eventDetail, setLeaveChannelInformation}) {
    const [showMessage, setShowMessage] = useState(false);
	const nav = useNavigate();

    const leaveEvent= function () {
        let event_id = eventDetail.id
		axios.put('/event/leave', {id:event_id})
			.then((response)=> {
				console.log('leave event response.data', response.data)
				if (eventDetail.chat_creation) {
					console.log('chat is true for this event, user is leaving.')
					let channelId = "EventChatroom";
					let channelName = eventDetail.name
					let code = eventDetail.code
					channelName += " Chatroom";
					channelId += code.toString();
					setLeaveChannelInformation([channelId, channelName])
					nav("/chatroom");
				}
				nav("/events/");
			})
	}

	const hideDetails = () => {
		setShowMessage(false);
	};

    const dialogFooter = (
		<Container as={myRow} className="flex justify-content-center">
			<Col>
				<Button
					label="Leave"
					icon="pi pi-eject"
					className="p-button-outlined"
					autoFocus
					onClick={() =>
						leaveEvent()
					}
				/>
			</Col>
			<Col></Col>
			<Col>
				<Button
					label="No"
					icon="pi pi-times"
					className="p-button-outlined"
					onClick={() =>
						hideDetails()
					}
				/>
			</Col>
		</Container>
	);

            
        return(
            <>
            <Button label="Leave" icon="pi pi-eject" className="p-button-text" onClick={()=>{setShowMessage(true)}}/>
            <Dialog
				visible={showMessage}
				onHide={hideDetails}
				showHeader={true}
				header="Leave Event?"
				footer={dialogFooter}
				breakpoints={{ "960px": "80vw" }}
				style={{ width: "30vw" }}
			>
				<div className="flex align-items-center flex-column pt-6 px-3 field">
					<p style={{ lineHeight: 1.5 }}>Are you sure you want to leave this event?</p>
				</div>
			</Dialog>
            </>
        )

}
