import { Button } from "primereact/button";
import axios from "axios";
import "./GroupRequestForm.css";
import { Dialog } from "primereact/dialog";
import { useState } from "react";
import { Form, Field } from "react-final-form";
import { InputText } from "primereact/inputtext";
import { classNames } from "primereact/utils";
import { Dropdown } from "primereact/dropdown";
import GroupsTable from "../../Tables/GroupsTable/GroupsTable";

export default function GroupRequestFormSpecific(props) {
	const [showInviteForm, setShowInviteForm] = useState(false);
	const [friendEmail, setFriendEmail] = useState(null);
	const groupCode = props.code;
	const groupName = props.name;

	const getTheCode = function (value) {
		for (let group of props.groups) {
			if (group[0] == value.label) {
				setGroupCode(group[1]);
			}
		}
	};

	const handleSubmit = () => {
		createGroupRequest(friendEmail);
		setShowInviteForm(false);
	};
	const validate = () => {
		let errors = {};
		if (!friendEmail) {
			errors.friendemail = "Friend's email is required.";
		} else if (
			!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(friendEmail)
		) {
			errors.friendemail =
				"Invalid email address. E.g. example@email.com";
		}
		return errors;
	};
	const isFormFieldValid = (meta) => !!(meta.touched && meta.error);
	const getFormErrorMessage = (meta) => {
		return (
			isFormFieldValid(meta) && (
				<small className="p-error">{meta.error}</small>
			)
		);
	};

	const createGroupRequest = function (friend_email) {
		if (groupCode) {
			axios
				.post("/group/request/create", {
					friend_email: friend_email,
					group_code: groupCode,
				})
				.then((response) => {
					// console.log(
					// 	"create group request response.data",
					// 	response.data
					// );
					if (response.data.success == "True") {
						window.alert("Group invitation sent!");
					} else {
						window.alert(`${response.data.reason}`);
					}
				});
		}
	};

	return (
		<>
			<Button
				label="Create Group Invite"
				onClick={() => setShowInviteForm(true)}
				icon="pi pi-plus"
				style={{ margin: "15px" }}
			/>
			<Dialog
				className="form-group-invite"
				header="Create Group Invitation"
				visible={showInviteForm}
				onHide={() => setShowInviteForm(false)}
			>
				<Form
					onSubmit={handleSubmit}
					initialValues={{
						groupname: "",
						friendemail: "",
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
												{...input}
												value={groupName}
												disabled={true}
												style={{ width: "100%" }}
											/>
											<label htmlFor="groupname">
												Group name
											</label>
										</span>
									</div>
								)}
							/>
							<Field
								className="field-group-request"
								name="friendemail"
								render={({ input, meta }) => (
									<div className="field">
										<span className="p-float-label">
											<InputText
												id="friendemail"
												{...input}
												value={friendEmail}
												onChange={(e) =>
													setFriendEmail(
														e.target.value
													)
												}
												className={classNames({
													"p-invalid":
														isFormFieldValid(meta),
													"form-group-invite-field": true,
												})}
											/>
											<label
												htmlFor="friendemail"
												className={classNames({
													"p-error":
														isFormFieldValid(meta),
												})}
											>
												Friend's email*
											</label>
										</span>
										{getFormErrorMessage(meta)}
									</div>
								)}
							/>

							<Button
								type="submit"
								label="Send Group Invitation"
								icon="pi pi-send"
								className="mt-2 btn-continue"
								onClick={handleSubmit}
							/>
						</>
					)}
				/>
			</Dialog>
		</>
	);
}
