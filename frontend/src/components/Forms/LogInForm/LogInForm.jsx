import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Field } from "react-final-form";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Password } from "primereact/password";
import { classNames } from "primereact/utils";
import { Divider } from "primereact/divider";
import { Panel } from "primereact/panel";
import "./LogInForm.css";
import { Container, Row, Col } from "react-bootstrap";
import axios from "axios";

export const LoginForm = () => {
	const [formData, setFormData] = useState({});
	const navigate = useNavigate();

	const validate = (data) => {
		let errors = {};
		if (!data.username) {
			errors.username = "Username is required.";
		} else if (!/^[A-Za-z0-9_-]{3,30}$/i.test(data.username)) {
			errors.username = "Invalid username, please try again";
		}
		if (!data.password) {
			errors.password = "Password is required.";
		} else if (data.password.length > 50) {
			errors.password = "Invalid password, please try again";
		}
		return errors;
	};

	const onSubmit = (data, form) => {
		// do we need to set the formdata or just send it to the server? can we pass in event to prevent default?
		setFormData(data);
		// event.preventDefault();
		axios.put("/login", data).then((response) => {
			// console.log(
			// 	"YOU ARE IN THE REACT .THEN RESPONSE FROM LOGIN",
			// 	response
			// );
			if (response.data.success === "False") {
				window.alert(response.data.reason);
			} else {
				form.restart();
				navigate("/");
				window.location.reload();
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

	const handleClick = () => {
		navigate("/signup");
	};

	return (
		<Container>
			<Col>
				<Row>
					<div className="form-login">
						<div className="flex justify-content-center">
							<div className="p-card card-login">
								<h2 className="text-center">Log in</h2>
								<Form
									onSubmit={onSubmit}
									initialValues={{
										username: "",
										password: "",
									}}
									validate={validate}
									render={({ handleSubmit }) => (
										<form
											onSubmit={handleSubmit}
											className="p-fluid"
										>
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
														{getFormErrorMessage(
															meta
														)}
													</div>
												)}
											/>
											<Field
												name="password"
												className="password-field"
												render={({ input, meta }) => (
													<div className="field">
														<span className="p-float-label">
															<Password
																id="password"
																{...input}
																feedback={false}
																toggleMask
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
														{getFormErrorMessage(
															meta
														)}
													</div>
												)}
											/>
											<Button
												type="submit"
												label="Log In"
												className="mt-2 btn-continue btn-login-form"
											/>
										</form>
									)}
								/>
								<Divider
									className="form-login-divider"
									align="center"
								>
									Or
								</Divider>
								<Button
									onClick={handleClick}
									className="mt-2 btn-continue btn-login-form"
									label="Sign Up"
								/>
							</div>
						</div>
					</div>
				</Row>
			</Col>
		</Container>
	);
};
