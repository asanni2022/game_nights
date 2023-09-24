import { Field } from "react-final-form";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { classNames } from "primereact/utils";
import { Form } from "react-final-form";
import { Row, Col, Container } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./GroupCreationForm.css";

export default function GroupCreationForm({
	viewGroups,
	setCreateGroupInformation,
}) {
	const [showMessage, setShowMessage] = useState(false);
	const [showForm, setShowForm] = useState(false);
	const [groupName, setGroupName] = useState("");
	// const [groupInformation, setGroupInformation] = useState(null);
	const [groupCode, setGroupCode] = useState(null);

	let creationError = "";
	const validate = () => {
		let errors = {};
		if (!groupName) {
			errors.groupname = "Group name is required.";
		}
		return errors;
	};
	const handleSubmit = (form) => {
		setShowForm(false);
		createGroup();
		// setShowMessage(true);
	};

	// hardcoded to group '1' for now
	// TODO: update redirect to group code when generated
	const onAck = () => {
		setShowMessage(false);
		setGroupName("");
		// setGroupInformation(null);
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

	const createGroup = function () {
		getGroupCode();
		axios
			.post("/group/create", { name: groupName, code: groupCode })
			.then((response) => {
				// console.log("create group response.data", response.data);
				if (response.data.success == "True") {
					setShowMessage(true);
					setCreateGroupInformation([groupName, groupCode]);
					viewGroups();
					// reload or nav to groups here
				} else {
					creationError = response.data.reason;
					setShowMessage(true);
					// window.alert(`${response.data.reason}`);
				}
			});
	};
	const getGroupCode = function () {
		axios.get("/group/code").then((response) => {
			// console.log(
			// 	"get group code response.data.group_code",
			// 	response.data.group_code
			// );
			let code = response && response.data && response.data.group_code;
			setGroupCode(code);
		});
	};
	useEffect(() => {
		getGroupCode();
	}, []);

	return (
		<>
			<Button
				label="Create Group"
				onClick={() => setShowForm(true)}
				icon="pi pi-plus"
				style={{ margin: "15px" }}
			/>
			<Dialog
				visible={showMessage}
				onHide={() => setShowMessage(false)}
				position="top"
				footer={dialogFooter}
				showHeader={false}
				breakpoints={{ "960px": "80vw" }}
				style={{ width: "30vw" }}
			>
				<div className="flex align-items-center flex-column pt-6 px-3 field">
					<h5>Group Creation Successful!</h5>
				</div>
			</Dialog>
			<Dialog
				visible={showForm}
				onHide={() => setShowForm(false)}
				showHeader={true}
				header="Create a Group"
			>
				<div className="form-group-create">
					<div className="flex justify-content-center">
						<div className="card-group-create">
							<Form
								onSubmit={handleSubmit}
								initialValues={{
									groupname: "",
								}}
								validate={validate}
								render={({ handleSubmit }) => (
									<>
										<Field
											name="groupname"
											render={({ input, meta }) => (
												<div className="field">
													<span className="p-float-label">
														<InputText
															id="groupname"
															{...input}
															value={groupName}
															onChange={(e) =>
																setGroupName(
																	e.target
																		.value
																)
															}
															className={classNames(
																{
																	"p-invalid":
																		isFormFieldValid(
																			meta
																		),
																	"form-group-creation-field": true,
																}
															)}
														/>
														<label
															htmlFor="groupname"
															className={classNames(
																{
																	"p-error":
																		isFormFieldValid(
																			meta
																		),
																}
															)}
														>
															Group Name*
														</label>
													</span>
													{getFormErrorMessage(meta)}
												</div>
											)}
										/>

										<Button
											type="submit"
											label="Create Group"
											className="mt-2 btn-continue"
											onClick={handleSubmit}
										/>
									</>
								)}
							/>
						</div>
					</div>
				</div>
			</Dialog>
		</>
	);
}
