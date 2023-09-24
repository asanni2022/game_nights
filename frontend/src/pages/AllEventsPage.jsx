import { AllEventsTable } from "../components/Tables/EventsTable/AllEventsTable";

export default function EventPage() {
	return (
		<>
			<h1 style={{ "margin-top": "20px" }}>Up for an adventure?</h1>
			<h2 style={{ "margin-bottom": "20px", color: "#6ABD6E" }}>
				Check out our community events!
			</h2>
			<hr />

			<AllEventsTable />
		</>
	);
}
