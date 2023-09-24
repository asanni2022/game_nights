import { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useNavigate } from "react-router-dom";
import moment from 'moment';
import axios from "axios";
import "./EventsTable.css";

export const AllEventsTable = () => {
	let navigate = useNavigate();

	const [event, setEvent] = useState(null);
	const [selectedEvent, setSelectedEvent] = useState(null)

	useEffect(() => {
		axios
			.get("/events")
			.then((response) => {
				console.log(response);
				let data = [];
				for (let item in response.data) {
					//only show public events
					if (response.data[item].fields.private === false) {
						data.push(response.data[item].fields);
					}
				}
				setEvent(data);
			})
			.catch((error) => {
				// console.log("ERROR", error);
			});
	}, []);
	
	useEffect(() => {
		if(selectedEvent != null) {
			navigate(`/events/${selectedEvent.code}`);
		}
	}, [selectedEvent])

	const addressBodyTemplate = (rowData) => {
		return rowData.address_1 + " " + rowData.address_2;
	};

	const formatDate = (value) => {
        return value.toLocaleDateString('en-US', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        });
    }

	const dateBodyTemplate = (rowData) => {
		let toDate = new Date(rowData.start_time)
        return formatDate(toDate);
    }
	
	return (
		<DataTable value={event} paginator rows={15} filterDisplay="menu" selectionMode="single" selection={selectedEvent} onSelectionChange={e => setSelectedEvent(e.value)} >
			<Column field="name" header="Event Name" filter />
			<Column field="category" header="Category" filter />
			<Column field="address_1" body={addressBodyTemplate} header="Address" filter filterField="address_1"/>
			<Column field="city" header="City" filter />
			<Column field="state" header="State" filter />
			<Column field="zip_code" header="Zip" filter />
			<Column field="start_time" header="Date" dataType="date" body={dateBodyTemplate} sortable filterField="start_time" />
		</DataTable>
	);
};
