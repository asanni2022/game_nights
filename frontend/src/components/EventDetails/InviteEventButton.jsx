import React from 'react';
import { Button } from 'primereact/button'
import { Dialog } from 'primereact/dialog';
import { useState } from 'react';
import { Form, Field } from "react-final-form";
import { InputText } from "primereact/inputtext";
import { classNames } from "primereact/utils";
import axios from 'axios'

export default function InviteButton({eventDetail}) {
  
  const [friendEmail, setFriendEmail] = useState(null);
  const [showDialog, setShowDialog] = useState(false)
  
  const validate = () => {
		let errors = {};
		if (!friendEmail) {
			errors.friendEmail = "Friend's email is required.";
		} else if (
			!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(friendEmail)
		) {
			errors.friendEmail =
				"Invalid email address. e.g. example@email.com";
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

  const handleSubmit = () => {
    console.log(eventDetail)
    axios.post('/eventrequest/create', {owner_id: eventDetail.owner_id, friend_email: friendEmail, event_id: eventDetail.id}).then((response) => {
		console.log('eventrequest create response.data', response.data)
		if(response.data.success === "True") {
        window.alert("Invite Successful")
        setShowDialog(false)
      } else {
        window.alert("Invite Failed")
      }
    })
  }

  return (
    <>
      <Button
        label="Invite"
        icon="pi pi-send"
        className="p-button-text"
        onClick={() => {
          setShowDialog(true)
        }}
      />
      <Dialog
        className="form-group-invite text-center"
				header="Create Event Invitation"
				visible={showDialog}
				onHide={() => setShowDialog(false)}
      >
        <p>{eventDetail.name}</p>
        <Form
						onSubmit={handleSubmit}
						initialValues={{
							friendEmail: "",
						}}
						validate={validate}
						render={({ handleSubmit }) => (
							<>
								<Field
									className="field-group-request"
									name="friendEmail"
									render={({ input, meta }) => (
										<div className="field">
											<span className="p-float-label">
												<InputText
													id="friendEmail"
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
													htmlFor="friendEmail"
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
									className="mt-2 btn-continue"
									onClick={handleSubmit}
								/>
              </>
						)}
					/>
      </Dialog>
    </>
  )
}