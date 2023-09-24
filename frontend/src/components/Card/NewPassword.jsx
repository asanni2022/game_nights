import { useState } from "react";
import React from 'react';
import { Form, Field } from "react-final-form";
import { Password } from "primereact/password";
import { classNames } from "primereact/utils";
import { Divider } from "primereact/divider";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import axios from 'axios';


export default function NewPassword({username, setPasswordDialog}) {
  
  const nav = useNavigate();

  const onSubmit = (data, form) => {
		// console.log(data.newPassword)
    axios.put('/new_password', {new_password: data.newPassword}).then((response) => {
      if(response.data.success === true) {
        window.alert("Password changed successfully")
        setPasswordDialog(false)
        // nav('/login')
      } else {
        window.alert(response.data.reason)
        setPasswordDialog(false)
      }
    })
	};

	const isFormFieldValid = (meta) => !!(meta.touched && meta.error);

	const getFormErrorMessage = (meta) => {
		return (
			isFormFieldValid(meta) && (
				<small className="p-error">{meta.error}</small>
			)
		);
	};

	const passwordHeader = <h6>Pick a password</h6>;

	const passwordFooter = (
		<React.Fragment>
			<Divider />
			<p className="mt-2">Suggestions</p>
			<ul className="pl-2 ml-2 mt-0" style={{ lineHeight: "1.5" }}>
				<li>At least one lowercase</li>
				<li>At least one uppercase</li>
				<li>At least one numeric</li>
				<li>Minimum 8 characters</li>
			</ul>
		</React.Fragment>
	);
  
  const validate = (data) => {
		let errors = {};

		if (!data.newPassword) {
			errors.newPassword = "Password is required.";
		}

    if (!data.confirmPassword) {
      errors.confirmPassword = "Password is required."
    }

    if (data.newPassword !== data.confirmPassword) {
      errors.newPassword = "Passwords do not match."
      errors.confirmPassword = "Passwords do not match."
    }

		return errors;
	};

	return (
		
    <Form
      onSubmit={onSubmit}
      initialValues={{
        newPassword: "",
        confirmPassword: "",
      }}
      validate={validate}
      render={({ handleSubmit }) => (
        <form
          onSubmit={handleSubmit}
          className="p-fluid"
        >
          <Field
            name="newPassword"
            render={({ input, meta }) => (
              <div className="field">
                <span className="p-float-label">
                  <Password
                    id="newPassword"
                    {...input}
                    toggleMask
                    className={classNames({
                      "p-invalid":
                        isFormFieldValid(
                          meta
                        ),
                    })}
                    header={passwordHeader}
                    footer={passwordFooter}
                  />
                  <label
                    htmlFor="newPassword"
                    className={classNames({
                      "p-error":
                        isFormFieldValid(
                          meta
                        ),
                    })}
                  >
                    New Password*
                  </label>
                </span>
                {getFormErrorMessage(meta)}
              </div>
            )}
          />
          <Field
            name="confirmPassword"
            render={({ input, meta }) => (
              <div className="field">
                <span className="p-float-label">
                  <Password
                    id="confirmPassword"
                    {...input}
                    toggleMask
                    className={classNames({
                      "p-invalid":
                        isFormFieldValid(
                          meta
                        ),
                    })}
                    feedback={false}
                  />
                  <label
                    htmlFor="confirmPassword"
                    className={classNames({
                      "p-error":
                        isFormFieldValid(
                          meta
                        ),
                    })}
                  >
                    Confirm Password*
                  </label>
                </span>
                {getFormErrorMessage(meta)}
              </div>
            )}
          />
          <Button
            type="submit"
            label="Submit"
            className="mt-2"
          />
        </form>
      )}
    />
	);
}