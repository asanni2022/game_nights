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

export default function GroupRequestForm(props) {
	// props = groups
	const [showInviteForm, setShowInviteForm] = useState(false);
	const [friendEmail, setFriendEmail] = useState(null);
	const [groupCode, setGroupCode] = useState(null);
	const [groupName, setGroupName] = useState(null);

	let groups = [];
	if (props.groups) {
		for (let group of props.groups) {
			// console.log('group here line 22 group request form', group)
			let tempGroup = {
				label: group[0],
			};

			groups.push(tempGroup);
		}
	} else {
		groups = {
			label: "None",
			value: null,
		};
	}

	const getTheCode = function (value) {
		for (let group of props.groups) {
			// console.log('group[0], name:', group[0], name)
			if (group[0] == value.label) {
				// console.log(
				// 	"group name here",
				// 	group[0],
				// 	"group code here",
				// 	group[1]
				// );
				setGroupCode(group[1]);
			}
		}
	};

	const handleSubmit = () => {
		// console.log("submit");
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
		if (!groupName) {
			errors.groupname = "Group name is required.";
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
				{props.groups ? (
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
												<Dropdown
													placeholder="Select Group"
													{...input}
													autoFocus
													value={groupName}
													options={groups}
													onChange={(e) => {
														setGroupName(e.value);
														getTheCode(e.value);
													}}
													className={classNames({
														"p-invalid":
															isFormFieldValid(
																meta
															),
														"form-group-invite-field": true,
													})}
												/>
												<label
													htmlFor="groupname"
													className={classNames({
														"p-error":
															isFormFieldValid(
																meta
															),
													})}
												>
													Group name*
												</label>
											</span>
											{getFormErrorMessage(meta)}
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
															isFormFieldValid(
																meta
															),
														"form-group-invite-field": true,
													})}
												/>
												<label
													htmlFor="friendemail"
													className={classNames({
														"p-error":
															isFormFieldValid(
																meta
															),
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
				) : (
					<p>You don't belong to any groups</p>
				)}
			</Dialog>
		</>
	);
}
