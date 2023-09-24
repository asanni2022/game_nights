import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Form, Field } from "react-final-form";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Password } from "primereact/password";
import { Dialog } from "primereact/dialog";
import { Divider } from "primereact/divider";
import { classNames } from "primereact/utils";
import "./SignUpForm.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const SignUpForm = () => {
	const [showMessage, setShowMessage] = useState(false);

	const [formData, setFormData] = useState({});

	const nav = useNavigate();

	const validate = (data) => {
		let errors = {};

		if (!data.firstname) {
			errors.firstname = "First Name is required.";
		} else if (!/^[A-Za-z0-9_-]{1,40}$/i.test(data.firstname)) {
			errors.firstname =
				"Sorry, you've exceeded the number of characters we allow for this field";
		}
		if (!data.lastname) {
			errors.lastname = "Last Name is required.";
		} else if (!/^[A-Za-z0-9_-]{1,40}$/i.test(data.lastname)) {
			errors.lastname =
				"Sorry, you've exceeded the number of characters we allow for this field";
		}
		if (!data.username) {
			errors.username = "Username is required.";
		} else if (!/^[A-Za-z0-9_-]{3,30}$/i.test(data.username)) {
			errors.username =
				"Username can only contain letters, numbers, hyphens, and underscores";
		} else if (data.username.length > 30 || data.username.length < 3) {
			errors.username =
				"Please choose a username between 3 and 30 characters long";
		}
		if (!data.email) {
			errors.email = "Email is required.";
		} else if (
			!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(data.email)
		) {
			errors.email = "Invalid email address. E.g. example@email.com";
		}
		if (!data.password) {
			errors.password = "Password is required.";
		} else if (data.password.length < 8) {
			errors.password =
				"Your password must be at least 8 characters long";
		} else if (data.password.length > 50) {
			errors.password =
				"Sorry, you've exceeded the number of characters we allow for this field";
		}

		return errors;
	};

	const onSubmit = (data, form) => {
		// console.log("submitted signupform, data is", data);
		// what about an event prevent default? Do we need to set the form data or just send it to the server?
		// event.preventDefault();
		setFormData(data);
		axios.post("/signup", data).then((response) => {
			// console.log("signup response", response);
			if (response.data.success === "False") {
				window.alert(response.data.reason);
				nav("/login");
			} else {
				setShowMessage(true);
				// clear form
				form.restart();
			}
		});
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
				onClick={() => nav("/login")}
			/>
		</div>
	);
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

	return (
		<Container className="form-signup">
			<Dialog
				visible={showMessage}
				onHide={() => setShowMessage(false)}
				position="top"
				footer={dialogFooter}
				showHeader={false}
				breakpoints={{ "960px": "80vw" }}
				style={{ width: "30vw" }}
			>
				<div className="flex align-items-center flex-column pt-6 px-3">
					{/* add gamenight logo here */}
					<h3>Registration Successful!</h3>
					<p style={{ lineHeight: 1.5 }}>
						Your account is registered under name{" "}
						<b>{formData.username}</b>
					</p>
				</div>
			</Dialog>
			<Row>
				<Col xs={3}></Col>
				<Col xs={6}>
					<div className="flex justify-content-center form-signup">
						<div className="p-card form-signup-card">
							<h2 className="text-center">Sign Up</h2>
							<Form
								onSubmit={onSubmit}
								initialValues={{
									firstname: "",
									lastname: "",
									username: "",
									email: "",
									password: "",
								}}
								validate={validate}
								render={({ handleSubmit }) => (
									<form
										onSubmit={handleSubmit}
										className="p-fluid"
									>
										<Field
											name="firstname"
											render={({ input, meta }) => (
												<div className="field">
													<span className="p-float-label">
														<InputText
															id="firstname"
															{...input}
															autoFocus
															className={classNames(
																{
																	"p-invalid":
																		isFormFieldValid(
																			meta
																		),
																}
															)}
														/>
														<label
															htmlFor="firstname"
															className={classNames(
																{
																	"p-error":
																		isFormFieldValid(
																			meta
																		),
																}
															)}
														>
															First Name*
														</label>
													</span>
													{getFormErrorMessage(meta)}
												</div>
											)}
										/>
										<Field
											name="lastname"
											render={({ input, meta }) => (
												<div className="field">
													<span className="p-float-label">
														<InputText
															id="lastname"
															{...input}
															className={classNames(
																{
																	"p-invalid":
																		isFormFieldValid(
																			meta
																		),
																}
															)}
														/>
														<label
															htmlFor="lastname"
															className={classNames(
																{
																	"p-error":
																		isFormFieldValid(
																			meta
																		),
																}
															)}
														>
															Last Name*
														</label>
													</span>
													{getFormErrorMessage(meta)}
												</div>
											)}
										/>
										<Field
											name="username"
											render={({ input, meta }) => (
												<div className="field">
													<span className="p-float-label p-input-icon-right">
														<i className="pi pi-user" />
														<InputText
															id="username"
															{...input}
															className={classNames(
																{
																	"p-invalid":
																		isFormFieldValid(
																			meta
																		),
																}
															)}
														/>
														<label
															htmlFor="username"
															className={classNames(
																{
																	"p-error":
																		isFormFieldValid(
																			meta
																		),
																}
															)}
														>
															Username*
														</label>
													</span>
													{getFormErrorMessage(meta)}
												</div>
											)}
										/>
										<Field
											name="email"
											render={({ input, meta }) => (
												<div className="field">
													<span className="p-float-label p-input-icon-right">
														<i className="pi pi-envelope" />
														<InputText
															id="email"
															{...input}
															className={classNames(
																{
																	"p-invalid":
																		isFormFieldValid(
																			meta
																		),
																}
															)}
														/>
														<label
															htmlFor="email"
															className={classNames(
																{
																	"p-error":
																		isFormFieldValid(
																			meta
																		),
																}
															)}
														>
															Email*
														</label>
													</span>
													{getFormErrorMessage(meta)}
												</div>
											)}
										/>
										<Field
											name="password"
											render={({ input, meta }) => (
												<div className="field">
													<span className="p-float-label">
														<Password
															id="password"
															{...input}
															toggleMask
															className={classNames(
																{
																	"p-invalid":
																		isFormFieldValid(
																			meta
																		),
																}
															)}
															header={
																passwordHeader
															}
															footer={
																passwordFooter
															}
														/>
														<label
															htmlFor="password"
															className={classNames(
																{
																	"p-error":
																		isFormFieldValid(
																			meta
																		),
																}
															)}
														>
															Password*
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
						</div>
					</div>
				</Col>
				<Col xs={3}></Col>
			</Row>
		</Container>
	);
};
