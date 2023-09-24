import React, {useState } from "react";
import { Row, Col, Container } from "react-bootstrap";
import { Form, Field } from "react-final-form";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { InputNumber } from "primereact/inputnumber";
import { Button } from "primereact/button";
import { SelectButton } from "primereact/selectbutton";
import { Dropdown } from "primereact/dropdown";
import { Calendar } from "primereact/calendar";
import { Dialog } from "primereact/dialog";
import { classNames } from "primereact/utils";
import { Checkbox } from "primereact/checkbox";
import { Chips } from "primereact/chips";
import "./EventCreationForm.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const EventCreationForm = ({ setCreateEventInformation }) => {
	const [showMessage, setShowMessage] = useState(false); // for submission dialog
	const [formData, setFormData] = useState({});
	const [eventName, setEventName] = useState(""); // event name
	const [eventCode, setEventCode] = useState(null);
	const [isPrivate, setIsPrivate] = useState(true); // event privacy
	const [category, setCategory] = useState(null); // category
	const [eventStartDate, setEventStartDate] = useState(null); // start datetime
	const [eventEndDate, setEventEndDate] = useState(null); // end datetime
	const [state, setState] = useState(null); // state for event location
	const [maxAttendees, setMaxAttendees] = useState(1); // max attendees
	const [createChat, setCreateChat] = useState(false); // create a chat for the event?
	const [games, setGames] = useState([]); // what games will be there?
	const [isAllDay, setIsAllDay] = useState(false); // is it an all-day event
	const [description, setDescription] = useState("");
	const [aLineOne, setALineOne] = useState("");
	const [aLineTwo, setALineTwo] = useState("");
	const [city, setCity] = useState("");
	const [zip, setZip] = useState("");
	const navigate = useNavigate();
	const isPrivateSelect = [
		{ label: "Private", value: true },
		{ label: "Public", value: false },
	];
	const categorySelectItems = [
		{ label: "Board Games", value: "BG" },
		{ label: "DnD", value: "DND" },
		{ label: "Tabletop Games", value: "TG" },
		{ label: "Card Games", value: "CG" },
		{ label: "Other", value: "OTH" },
	];
	const stateSelectItems = [
		{ label: "Alabama", value: "AL" },
		{ label: "Alaska", value: "AK" },
		{ label: "Arizona", value: "AZ" },
		{ label: "Arkansas", value: "AR" },
		{ label: "California", value: "CA" },
		{ label: "Colorado", value: "CO" },
		{ label: "Connecticut", value: "CT" },
		{ label: "Delaware", value: "DE" },
		{ label: "DC", value: "DC" },
		{ label: "Florida", value: "FL" },
		{ label: "Georgia", value: "GA" },
		{ label: "Guam", value: "GU" },
		{ label: "Hawaii", value: "HI" },
		{ label: "Idaho", value: "ID" },
		{ label: "Illinois", value: "IL" },
		{ label: "Indiana", value: "IN" },
		{ label: "Iowa", value: "IA" },
		{ label: "Kansas", value: "KS" },
		{ label: "Kentucky", value: "KY" },
		{ label: "Louisiana", value: "LA" },
		{ label: "Maine", value: "ME" },
		{ label: "Maryland", value: "MD" },
		{ label: "Massachusetts", value: "MA" },
		{ label: "Michigan", value: "MI" },
		{ label: "Minnesota", value: "MN" },
		{ label: "Mississippi", value: "MS" },
		{ label: "Missouri", value: "MO" },
		{ label: "Montana", value: "MT" },
		{ label: "Nebraska", value: "NE" },
		{ label: "Nevada", value: "NV" },
		{ label: "New Hampshire", value: "NH" },
		{ label: "New Jersey", value: "NJ" },
		{ label: "New Mexico", value: "NM" },
		{ label: "New York", value: "NY" },
		{ label: "North Carolina", value: "NC" },
		{ label: "North Dakota", value: "ND" },
		{ label: "Ohio", value: "OH" },
		{ label: "Oklahoma", value: "OK" },
		{ label: "Oregon", value: "OR" },
		{ label: "Pennsylvania", value: "PA" },
		{ label: "Puerto Rico", value: "PR" },
		{ label: "Rhode Island", value: "RI" },
		{ label: "South Carolina", value: "SC" },
		{ label: "South Dakota", value: "SD" },
		{ label: "Tennessee", value: "TN" },
		{ label: "Texas", value: "TX" },
		{ label: "Utah", value: "UT" },
		{ label: "Vermont", value: "VT" },
		{ label: "Virgin Islands", value: "VI" },
		{ label: "Virginia", value: "VA" },
		{ label: "Washington", value: "WA" },
		{ label: "West Virginia", value: "WV" },
		{ label: "Wisconsin", value: "WI" },
		{ label: "Wyoming", value: "WY" },
	];

	// TODO: add validation back in
	const validate = (data) => {
		let errors = {};
		if (!eventName) {
			errors.eventname = "Event name is required.";
		}
		if (!category) {
			errors.category = "Category is required.";
		}
		if (games.length === 0) {
			errors.boardgames = "Games are required.";
		}
		if (!eventStartDate) {
			errors.eventstartdate = "Start date is required.";
		}
		if (!eventEndDate) {
			errors.eventenddate = "End date is required.";
		}
		if (!aLineOne) {
			errors.addressline1 = "Address Line 1 is required.";
		}
		if (!city) {
			errors.city = "City is required.";
		}
		if (!state) {
			errors.state = "State is required.";
		}
		if (!zip) {
			errors.zipcode = "Zipcode is required.";
		} else if (zip.length > 5) {
			errors.zipcode = "Enter a valid zipcode.";
		}
		return errors;
	};

	const handleSubmit = (form) => {
		// console.log("in on submit for event");
		setShowMessage(true);

		// setShowMessage(true);
		// let attendees = document.getElementById('maxattendees').value
		// console.log('attendees', attendees)

		axios
			.post("/events/create", {
				event_name: eventName,
				category: category,
				games: games,
				private: isPrivate,
				attendees: maxAttendees,
				chatcreation: createChat,
				allDay: isAllDay,
				eventStart: eventStartDate,
				eventEnd: eventEndDate,
				description: description,
				addressLine1: aLineOne,
				addressLine2: aLineTwo,
				city: city,
				state: state,
				zip: zip,
			})
			.then((response) => {
				// console.log("create event response", response);
				let theEventCode =
					response && response.data && response.data.eventCode;
				setEventCode(theEventCode);
				if (chatcreation) {
					let eventName =
						response && response.data && response.data.eventName;
					let code =
						response && response.data && response.data.eventCode;
					setCreateEventInformation([eventName, code]);
				}
			})
			.catch((error) => {
				// console.log("create event ERROR", error);
			});
	};

	// hardcoded to event '1' for now
	// TODO: update redirect to event code when generated
	const onAck = () => {
		const eventURL = "/events/" + eventCode + "/";
		setShowMessage(false);
		if (createChat) {
			navigate('/chatroom');
		}
		else {
			navigate(eventURL);
		}
		// navigate not working.
	};

	const isFormFieldValid = (meta) => !!(meta.touched && meta.error);
	const getFormErrorMessage = (meta) => {
		return (
			isFormFieldValid(meta) && (
				<small className="p-error">{meta.error}</small>
			)
		);
	};

	const dialogFooter = (
		<div className="flex justify-content-center">
			<Button
				label="OK"
				className="p-button-text"
				autoFocus
				onClick={onAck}
			/>
		</div>
	);

	return (
		<Container as={Row} className="form-event-create-container">
			<Dialog
				visible={showMessage}
				onHide={() => setShowMessage(false)}
				position="top"
				footer={dialogFooter}
				showHeader={false}
				breakpoints={{ "960px": "80vw" }}
				style={{ width: "30vw" }}
			>
				{/* TODO: get event code for dialog message */}
				<div className="flex align-items-center flex-column pt-6 px-3 field">
					<h5>Event Creation Successful!</h5>
					{createChat &&
						<p style={{ lineHeight: 1.5 }}>
						Your event and event-chatroom have now been created!
					</p>
					}
					{!createChat &&
						<p style={{ lineHeight: 1.5 }}>
							Your event has been created!
						</p>
					}
				</div>
			</Dialog>
			<Col></Col>

			<Col>
				<div className="flex justify-content-center form-event-create">
					<div className="p-card form-event-create-card">
						<h2 className="text-center">Create Event</h2>
						<Form
							onSubmit={handleSubmit}
							initialValues={{
								eventname: "",
								category: null,
								maxattendees: null,
								isprivate: true,
								chatcreation: true,
								boardGames: [],
								eventstartdate: null,
								eventenddate: null,
								allday: false,
								description: "",
								addressline1: "",
								addressline2: "",
								city: "",
								state: null,
								zipcode: "",
							}}
							validate={validate}
							render={({ handleSubmit }) => (
								<form
									onSubmit={handleSubmit}
									className="p-fluid"
								>
									<Row>
										<Col xs={7}>
											<Field
												name="eventname"
												render={({ input, meta }) => (
													<div className="field">
														<span className="p-float-label">
															<InputText
																id="eventname"
																{...input}
																autoFocus
																value={
																	eventName
																}
																onChange={(e) =>
																	setEventName(
																		e.target
																			.value
																	)
																}
																className={classNames(
																	{
																		"p-error":
																			isFormFieldValid(
																				meta
																			),
																	}
																)}
															/>
															<label
																htmlFor="eventname"
																className={classNames(
																	{
																		"p-error":
																			isFormFieldValid(
																				meta
																			),
																	}
																)}
															>
																Event name*
															</label>
														</span>
														{getFormErrorMessage(
															meta
														)}
													</div>
												)}
											/>
										</Col>
										<Col xs={5}>
											<Field
												name="category"
												render={({ input, meta }) => (
													<div className="field">
														<Dropdown
															id="category"
															{...input}
															value={category}
															options={
																categorySelectItems
															}
															onChange={(e) =>
																setCategory(
																	e.target
																		.value
																)
															}
															placeholder="Event category"
															className={classNames(
																{
																	"p-error":
																		isFormFieldValid(
																			meta
																		),
																}
															)}
														/>
														{getFormErrorMessage(
															meta
														)}
													</div>
												)}
											/>
										</Col>
									</Row>
									<Row>
										<Col>
											<Field
												name="boardgames"
												render={({ input, meta }) => (
													<div className="field">
														<span className="p-float-label">
															<Chips
																id="boardgames"
																{...input}
																value={games}
																onChange={(e) =>
																	setGames(
																		e.target
																			.value
																	)
																}
																tooltip="Type in a game then press enter to add it to your game list."
																className={classNames(
																	{
																		"p-error":
																			isFormFieldValid(
																				meta
																			),
																	}
																)}
															/>
															<label
																htmlFor="boardgames"
																className={classNames(
																	{
																		"p-error":
																			isFormFieldValid(
																				meta
																			),
																	}
																)}
															>
																Games
															</label>
														</span>
														{getFormErrorMessage(
															meta
														)}
													</div>
												)}
											/>
										</Col>
									</Row>
									<Row>
										<Col xs={4}>
											<Field
												name="isprivate"
												render={({ input }) => (
													<div className="field">
														<SelectButton
															id="isprivate"
															{...input}
															value={isPrivate}
															options={
																isPrivateSelect
															}
															onChange={(e) =>
																setIsPrivate(
																	e.target
																		.value
																)
															}
														></SelectButton>
													</div>
												)}
											/>
										</Col>
										<Col xs={4}>
											<Field
												name="maxattendees"
												render={({ input }) => (
													<div className="field">
														<span className="p-float-label">
															<InputNumber
																id="maxattendees"
																{...input}
																showButtons
																value={
																	maxAttendees
																}
																placeholder="Max attendees"
																onValueChange={(
																	e
																) =>
																	setMaxAttendees(
																		e.target
																			.value
																	)
																}
																min={1}
																max={500}
															/>
															<label htmlFor="maxattendees">
																Max Attendees
															</label>
														</span>
													</div>
												)}
											/>
										</Col>
										<Col>
											<Field
												name="chatcreation"
												render={({ input }) => (
													<div className="field">
														<Checkbox
															id="chatcreation"
															{...input}
															onChange={(e) =>
																setCreateChat(
																	!createChat
																)
															}
															checked={createChat}
														/>
														<label
															htmlFor="chatcreation"
															className="p-checkbox-label form-event-create-checkbox-label"
														>
															Create chatroom for
															event
														</label>
													</div>
												)}
											/>
										</Col>
									</Row>
									<Row>
										<Col xs={2}>
											<Field
												name="allday"
												render={({ input }) => (
													<div className="field">
														<Checkbox
															id="allday"
															{...input}
															checked={isAllDay}
															onChange={(e) =>
																setIsAllDay(
																	!isAllDay
																)
															}
														/>
														<label
															htmlFor="allday"
															className="p-checkbox-label form-event-create-checkbox-label"
														>
															All day
														</label>
													</div>
												)}
											/>
										</Col>
										<Col xs={5}>
											<Field
												name="eventstartdate"
												render={({ input, meta }) => (
													<div className="field">
														<span className="p-float-label">
															<Calendar
																id="eventstartdate"
																baseZIndex={
																	5001
																}
																{...input}
																dateFormat="mm/dd/yy"
																mask="99/99/9999"
																showIcon
																showTime={
																	!isAllDay
																}
																hourFormat="12"
																value={
																	eventStartDate
																}
																minDate={
																	new Date()
																}
																maxDate={
																	eventEndDate
																}
																onChange={(e) =>
																	setEventStartDate(
																		e.target
																			.value
																	)
																}
																showButtonBar
															/>
															<label
																htmlFor="eventstartdate"
																className={classNames(
																	{
																		"p-error":
																			isFormFieldValid(
																				meta
																			),
																	}
																)}
															>
																Event Start
															</label>
														</span>
														{getFormErrorMessage(
															meta
														)}
													</div>
												)}
											/>
										</Col>
										<Col xs={5}>
											<Field
												name="eventenddate"
												render={({ input, meta }) => (
													<div className="field">
														<span className="p-float-label">
															<Calendar
																id="eventenddate"
																baseZIndex={
																	5001
																}
																{...input}
																dateFormat="mm/dd/yy"
																mask="99/99/9999"
																showIcon
																showTime={
																	!isAllDay
																}
																hourFormat="12"
																value={
																	eventEndDate
																}
																onChange={(e) =>
																	setEventEndDate(
																		e.target
																			.value
																	)
																}
																minDate={
																	eventStartDate
																}
																showButtonBar
															/>
															<label
																htmlFor="eventenddate"
																className={classNames(
																	{
																		"p-error":
																			isFormFieldValid(
																				meta
																			),
																	}
																)}
															>
																Event End
															</label>
														</span>
														{getFormErrorMessage(
															meta
														)}
													</div>
												)}
											/>
										</Col>
									</Row>
									<Row>
										<Field
											name="description"
											render={({ input }) => (
												<div className="field">
													<span className="p-float-label">
														<InputTextarea
															id="description"
															{...input}
															value={description}
															onChange={(e) =>
																setDescription(
																	e.target
																		.value
																)
															}
														/>
														<label htmlFor="description">
															Description
														</label>
													</span>
												</div>
											)}
										/>
									</Row>
									<Row>
										<Col>
											<Field
												name="addressline1"
												render={({ input, meta }) => (
													<div className="field">
														<span className="p-float-label">
															<InputText
																id="addressline1"
																{...input}
																value={aLineOne}
																onChange={(e) =>
																	setALineOne(
																		e.target
																			.value
																	)
																}
															/>
															<label
																htmlFor="addressline1"
																className={classNames(
																	{
																		"p-error":
																			isFormFieldValid(
																				meta
																			),
																	}
																)}
															>
																Address Line 1*
															</label>
														</span>
														{getFormErrorMessage(
															meta
														)}
													</div>
												)}
											/>
										</Col>
										<Col>
											<Field
												name="addressline2"
												render={({ input }) => (
													<div className="field">
														<span className="p-float-label">
															<InputText
																id="addressline2"
																{...input}
																value={aLineTwo}
																onChange={(e) =>
																	setALineTwo(
																		e.target
																			.value
																	)
																}
															/>
															<label htmlFor="addressline2">
																Address Line 2
															</label>
														</span>
													</div>
												)}
											/>
										</Col>
									</Row>
									<Row>
										<Col xs={5}>
											<Field
												name="city"
												render={({ input, meta }) => (
													<div className="field">
														<span className="p-float-label">
															<InputText
																id="city"
																{...input}
																value={city}
																onChange={(e) =>
																	setCity(
																		e.target
																			.value
																	)
																}
															/>
															<label
																htmlFor="city"
																className={classNames(
																	{
																		"p-error":
																			isFormFieldValid(
																				meta
																			),
																	}
																)}
															>
																City*
															</label>
														</span>
														{getFormErrorMessage(
															meta
														)}
													</div>
												)}
											/>
										</Col>
										<Col xs={5}>
											<Field
												name="state"
												render={({ input, meta }) => (
													<div className="field">
														<Dropdown
															id="state"
															{...input}
															value={state}
															options={
																stateSelectItems
															}
															onChange={(e) =>
																setState(
																	e.target
																		.value
																)
															}
															placeholder="State*"
														/>
														{getFormErrorMessage(
															meta
														)}
													</div>
												)}
											/>
										</Col>
										<Col xs={2}>
											<Field
												name="zipcode"
												render={({ input, meta }) => (
													<div className="field">
														<span className="p-float-label">
															<InputText
																id="zipcode"
																{...input}
																keyfilter="int"
																value={zip}
																onChange={(e) =>
																	setZip(
																		e.target
																			.value
																	)
																}
															/>
															<label
																htmlFor="zipcode"
																className={classNames(
																	{
																		"p-error":
																			isFormFieldValid(
																				meta
																			),
																	}
																)}
															>
																Zipcode*
															</label>
														</span>
														{getFormErrorMessage(
															meta
														)}
													</div>
												)}
											/>
										</Col>
									</Row>
									<Button
										type="submit"
										label="Create Event"
										className="mt-2"
									/>
								</form>
							)}
						/>
					</div>
				</div>
			</Col>
			<Col></Col>
		</Container>
	);
};
