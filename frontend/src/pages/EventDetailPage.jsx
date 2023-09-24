import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import { Button } from 'primereact/button';
import { useNavigate } from "react-router-dom";
import moment from 'moment';
import axios from 'axios';
import EventDetailList from "../components/List/EventDetailList"
import DialogGame from "../components/Dialog/DialogGame"

export default function EventDetailPage({user, setDeleteChannelInformation, setLeaveChannelInformation, setJoinEventInformation}) {

	let navigate = useNavigate();

	let { eventId } = useParams();

	const [editable, setEditable] = useState(true);
	const [eventDetail, setEventDetail] = useState(null);
	const [games, setGames] = useState(null);
	const [startTime, setStartTime] = useState(null);
	const [endTime, setEndTime] = useState(null);

	const [attending, setAttending] = useState(false);

	const [gameInfo, setGameInfo] = useState(null);
	const [displayBasic2, setDisplayBasic2] = useState(false);

	useEffect(() => {
		axios.get(`/userevents/${eventId}`).then((response) => {
			setGames(Object.values(response.data[0].games));
			setStartTime(
				moment(response.data[0].start_time).format(
					"MMMM Do YYYY, h:mm a"
				)
			);
			setEndTime(
				moment(response.data[0].end_time).format("MMMM Do YYYY, h:mm a")
			);
			//this if statement never gets called because user is null
			if (response.data[0].owner_true === 0) {
				setEditable(false);
			}
			setEventDetail(response.data[0]);
		});
	}, []);

	useEffect(() => {
		axios.get(`/amattending/${eventId}`).then((response) => {
			setAttending(response.data);
		});
	}, []);

	const goBack = () => {
		navigate(-1)
	}

	return(
		<>
			<Button label="Back" icon="pi pi-step-backward" className="p-button-text" onClick={goBack}
			style={{
				"display": "flex",
				"margin": "30px 30px",
				"position": "absolute"
				}} />
			<div style={{'margin-left': '20%', 'margin-right': '20%'}}>
				{eventDetail &&
					<EventDetailList eventDetail={eventDetail} editable={editable} user={user} games={games} startTime={startTime} endTime={endTime} setGameInfo={setGameInfo} setDisplayBasic2={setDisplayBasic2} setDeleteChannelInformation={setDeleteChannelInformation} setLeaveChannelInformation={setLeaveChannelInformation} attending={attending} setJoinEventInformation={setJoinEventInformation}/>
					
				}
				{gameInfo &&
					<DialogGame gameInfo={gameInfo} displayBasic2={displayBasic2} setDisplayBasic2={setDisplayBasic2}/>
				}
			</div>
		</>
	)
}
