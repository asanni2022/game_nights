// import CarouselHome from '../components/Carousel/CarouselHome'
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { LoginForm } from "../components/Forms/LogInForm/LogInForm";
import CardHome from "../components/Card/CardHome";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import "../App.css";
import { useNavigate } from "react-router-dom";
import homeImage from "../assets/Images/board_games.svg";

export default function HomePage({ user }) {
	const navigate = useNavigate();
	const handleLogInClick = () => {
		navigate("/login");
	};
	const handleSignUpClick = () => {
		navigate("/signup");
	};
	return (
		<div className="w-100">
			<Container as={Row} className="mx-auto w-100">
				<Row style={{ "margin-bottom": "30px" }}>
					<Col xs={5}>
						<Row xs={4}></Row>
						<Row>
							<span style={{ "padding-top": "125px" }}>
								<h1>Planning game nights</h1>
								<h1 style={{ color: "#6ABD6E" }}>
									has never been easier
								</h1>
								<hr />

								{!user && (
									<Button
										label="Log In"
										type="button"
										className="mr-3 p-button"
										style={{ margin: "15px" }}
										onClick={handleLogInClick}
									/>
								)}
								{!user && (
									<Button
										label="Sign Up"
										type="button"
										className="p-button-outlined"
										style={{ margin: "15px" }}
										onClick={handleSignUpClick}
									/>
								)}
							</span>
						</Row>
						<Row xs={4}></Row>
					</Col>
					<Col xs={7} className="overflow-hidden">
						<img
							src="https://assets.dicebreaker.com/board-game-friends-playing-table-sofa.jpeg/BROK/resize/1200x1200%3E/format/jpg/quality/70/board-game-friends-playing-table-sofa.jpeg"
							alt="hero-1"
							className="md:ml-auto block md:h-full"
							style={{
								clipPath:
									"polygon(8% 0, 100% 0%, 100% 100%, 0 100%)",
								"max-width": "100%",
							}}
						/>
					</Col>
				</Row>

				<Row style={{ "margin-top": "30px", "margin-bottom": "30px" }}>
					<Container as={Row}>
						<Row>
							<Col></Col>
							<Col>
								<hr />
								<h4
									style={{
										margin: "20px",
										width: "700px",
										lineHeight: "1.5",
									}}
								>
									GameNight welcomes all board game, card
									game, dice, DnD, and other game enthusiasts!
									Our site makes it easy to plan the perfect
									game night! Create a private game night with
									just your close-knit friends, or create and
									search for public games in your area. Use
									the calendar and chatroom to make
									communication and scheduling a piece of
									cake! Lets play!
								</h4>
								<hr />
								{/* <p
									style={{
										"margin-top": "30px",
										fontSize: "18pt",
									}}
								>
									Why Choose Us?
								</p> */}
							</Col>
							<Col></Col>
						</Row>
						<Row
							style={{
								"margin-top": "30px",
								"margin-bottom": "30px",
								height: "450px",
							}}
						>
							<Col xs={4}>
								<Card
									style={{
										height: "100%",
										padding: "15px",
										margin: "10px",
									}}
								>
									<span
										className="p-3 shadow-2 mb-3 inline-block"
										style={{ borderRadius: "10px" }}
									>
										<i className="pi pi-calendar"></i>
									</span>
									<h5 style={{ "margin-bottom": "20px" }}>
										Event Planning
									</h5>
									<span className=" text-sm line-height-3">
										Plan your next game night with an event
										creation! Keep up to date with future
										events using our event calendar. Never
										forget a game night again!
									</span>
								</Card>
							</Col>
							<Col xs={4}>
								<Card
									style={{
										height: "100%",
										padding: "15px",
										margin: "10px",
									}}
								>
									<span
										className="p-3 shadow-2 mb-3 inline-block"
										style={{ borderRadius: "10px" }}
									>
										<i className="pi pi-check"></i>
									</span>
									<h5 style={{ "margin-bottom": "20px" }}>
										A Huge Selection of Games
									</h5>
									<img src={homeImage} />
								</Card>
							</Col>
							<Col xs={4}>
								<Card
									style={{
										height: "100%",
										padding: "15px",
										margin: "10px",
									}}
								>
									<span
										className="p-3 shadow-2 mb-3 inline-block"
										style={{ borderRadius: "10px" }}
									>
										<i className="pi pi-comments"></i>
									</span>
									<h5 style={{ "margin-bottom": "20px" }}>
										User Groups and Chatrooms
									</h5>
									<span className="text-sm line-height-3">
										GameNight Group offers the ability to
										talk and plan about your next game night
										event with ease! Invite and join members
										to your group and use our chatroom for
										easy communication and scheduling.
									</span>
								</Card>
							</Col>
						</Row>
					</Container>
				</Row>
				<hr />
				<Row style={{ "margin-top": "30px", "margin-bottom": "30px" }}>
					<Col xs={2}></Col>
					<Col>
						{!user && (
							<Card className=" text-center">
								<h2 className="mb-3">Join Our Community</h2>

								<Button
									label="Sign Up Now"
									icon="pi pi-user"
									className="font-bold px-5 py-3 p-button-raised p-button-rounded white-space-nowrap"
									onClick={handleSignUpClick}
								/>
							</Card>
						)}
					</Col>
					<Col xs={2}></Col>
				</Row>
			</Container>
		</div>
	);
}
{
	/* <br></br>
		<Container>
		<Row>
			<Col md={7}>
			<img
			src='https://assets.dicebreaker.com/board-game-friends-playing-table-sofa.jpeg/BROK/resize/1200x1200%3E/format/jpg/quality/70/board-game-friends-playing-table-sofa.jpeg'
			/>
			</Col>
			<Col md={5}>
				<CardHome />
				<Row>
					<Col>
					{user ? 
						null
					: <LoginForm />}
					</Col>
				</Row>
			</Col>
		</Row>

		</Container> */
}
