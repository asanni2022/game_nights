import './EventDetailList.css'
import "primeflex/primeflex.css";
import { InputText } from 'primereact/inputtext';
import { Chips } from 'primereact/chips';
import { InputTextarea } from 'primereact/inputtextarea';
import { SelectButton } from "primereact/selectbutton";
import { Calendar } from "primereact/calendar";
import { InputNumber } from "primereact/inputnumber";
import { Dropdown } from "primereact/dropdown";
import { Button } from 'primereact/button';
import { Chip } from 'primereact/chip';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import './EventDetailList.css';
import { useEffect, useState } from 'react';

// import { StyleClass } from 'primereact/styleclass';
import axios from 'axios';
import EventDetailButtons from '../EventDetails/EventDetailButtons';

export default function EventDetailList({eventDetail, games, editable, startTime, endTime, setGameInfo, setDisplayBasic2, user, setDeleteChannelInformation, setLeaveChannelInformation, attending, setJoinEventInformation}){

    const [eventStartDate, setEventStartDate] = useState(null); // start datetime
    const [eventEndDate, setEventEndDate] = useState(null); // end datetime

    const [editName, setEditName] = useState(false);
    const [editDesc, setEditDesc] = useState(false);
    const [editGames, setEditGames] = useState(false);
    const [editLocation, setEditLocation] = useState(false);
    const [editTime, setEditTime] = useState(false);
    const [editMaxAttendees, setEditMaxAttendees] = useState(false);
    const [editPrivate, setEditPrivate] = useState(false);
    
    const [newName, setNewName] = useState(eventDetail.name);
    const [newDesc, setNewDesc] = useState(eventDetail.description);
    const [newGames, setNewGames] = useState(games);
    const [newMaxAttendees, setNewMaxAttendees] = useState(eventDetail.max_attendees);
    const [newPrivate, setNewPrivate] = useState(eventDetail.private);
    const [newAddressLine1, setNewAddressLine1] = useState(eventDetail.address_1);
    const [newAddressLine2, setNewAddressLine2] = useState(eventDetail.address_2);
    const [newCity, setNewCity] = useState(eventDetail.city);
    const [newState, setNewState] = useState(eventDetail.state);
    const [newZip, setNewZip] = useState(eventDetail.zip_code);
    const [newStartTime, setNewStartTime] = useState(eventDetail.start_time);
    const [newEndTime, setNewEndTime] = useState(eventDetail.end_time);

    const stateSelectItems = [
		{ label: "Alabama", value: "AL" },
		{ label: "Alaska", value: "AK" },
		{ label: "Arizona", value: "AZ" },
		{ label: "Arkansas", value: "AR" },
		{ label: "California", value: "CA" },
		{ label: "Colorado", value: "CO" },
		{ label: "Connecticut", value: "CT" },
		{ label: "Delaware", value: "DE" },
		{ label: "DC", value: "DC" },
		{ label: "Florida", value: "FL" },
		{ label: "Georgia", value: "GA" },
		{ label: "Guam", value: "GU" },
		{ label: "Hawaii", value: "HI" },
		{ label: "Idaho", value: "ID" },
		{ label: "Illinois", value: "IL" },
		{ label: "Indiana", value: "IN" },
		{ label: "Iowa", value: "IA" },
		{ label: "Kansas", value: "KS" },
		{ label: "Kentucky", value: "KY" },
		{ label: "Louisiana", value: "LA" },
		{ label: "Maine", value: "ME" },
		{ label: "Maryland", value: "MD" },
		{ label: "Massachusetts", value: "MA" },
		{ label: "Michigan", value: "MI" },
		{ label: "Minnesota", value: "MN" },
		{ label: "Mississippi", value: "MS" },
		{ label: "Missouri", value: "MO" },
		{ label: "Montana", value: "MT" },
		{ label: "Nebraska", value: "NE" },
		{ label: "Nevada", value: "NV" },
		{ label: "New Hampshire", value: "NH" },
		{ label: "New Jersey", value: "NJ" },
		{ label: "New Mexico", value: "NM" },
		{ label: "New York", value: "NY" },
		{ label: "North Carolina", value: "NC" },
		{ label: "North Dakota", value: "ND" },
		{ label: "Ohio", value: "OH" },
		{ label: "Oklahoma", value: "OK" },
		{ label: "Oregon", value: "OR" },
		{ label: "Pennsylvania", value: "PA" },
		{ label: "Puerto Rico", value: "PR" },
		{ label: "Rhode Island", value: "RI" },
		{ label: "South Carolina", value: "SC" },
		{ label: "South Dakota", value: "SD" },
		{ label: "Tennessee", value: "TN" },
		{ label: "Texas", value: "TX" },
		{ label: "Utah", value: "UT" },
		{ label: "Vermont", value: "VT" },
		{ label: "Virgin Islands", value: "VI" },
		{ label: "Virginia", value: "VA" },
		{ label: "Washington", value: "WA" },
		{ label: "West Virginia", value: "WV" },
		{ label: "Wisconsin", value: "WI" },
		{ label: "Wyoming", value: "WY" },
	];

    const isPrivateSelect = [
		{ label: "Private", value: true },
		{ label: "Public", value: false },
	];

    const handleClick = (game) => {
        axios.get(`/games/${game}`)
        .then((response) => {
            setGameInfo(response)
            setDisplayBasic2(true)
        })
        .catch((error) => console.log('error: ' + error))
    }

    const updateEvent = () => {
        setEditName(false);
        setEditDesc(false);
        setEditGames(false);
        setEditMaxAttendees(false);
        setEditPrivate(false);
        setEditLocation(false);
        setEditTime(false);
        axios.put(`/userevents/${eventDetail.code}`, {
            name: newName,
            description: newDesc,
            games: newGames,
            address_1: newAddressLine1,
            address_2: newAddressLine2,
            city: newCity,
            state: newState,
            zip_code: newZip,
            max_attendees: newMaxAttendees,
            private: newPrivate,
            start_time: newStartTime,
            end_time: newEndTime
        })
        .then((response) => {
            window.location.reload()
            console.log(response)
        })
        .catch((error) => console.log(error))
    }


 return(
    <div className="surface-0">
    <div className="font-medium text-3xl text-900 mb-3 mt-3">Event Information</div>
    {/* <div className="text-500 mb-5">Find information on event below. Event Owners can edit their information here.</div> */}
    <ul className="list-none p-0 m-0">
        <li className="flex align-items-center py-3 px-2 border-top-1 border-300 flex-wrap">
            <div className="text-500 w-6 md:w-2 font-medium">Event Name</div>
            <div className="text-900 w-full md:w-8 md:flex-order-0 flex-order-1">{eventDetail.name}</div>
        </li>
        <li className="flex align-items-center py-3 px-2 border-top-1 border-300 flex-wrap">
            <div className="text-500 w-6 md:w-2 font-medium">Owner</div>
            <div className="text-900 w-full md:w-8 md:flex-order-0 flex-order-1">{eventDetail.username}</div>
        </li>
        <li className="flex align-items-center py-3 px-2 border-top-1 border-300 flex-wrap">
            <div className="text-500 w-6 md:w-2 font-medium">Description</div>
            {editDesc ? 
                <div className="w-full md:w-8 md:flex-order-0 flex-order-1">
                    <InputTextarea value={newDesc} onChange={(e) => setNewDesc(e.target.value)} rows={5} cols={30}/>
                </div>
            :
                <div className="text-900 w-full md:w-8 md:flex-order-0 flex-order-1 line-height-3">{eventDetail.description}</div>
            }
            {editable ?
            <div className="w-6 md:w-2 flex justify-content-end">
                { editDesc ? 
                    <Button label="Update" icon="pi pi-check" className="p-button-text" onClick={updateEvent}/>
                :
                    <Button label="Edit" icon="pi pi-pencil" className="p-button-text" onClick={() => setEditDesc(true)}/>
                }
            </div>
            : null }
        </li>
        <li className="flex align-items-center py-3 px-2 border-top-1 border-300 flex-wrap">
            <div className="text-500 w-6 md:w-2 font-medium">Owner's Games</div>
            {editGames ?
                <div className="w-full md:w-8 md:flex-order-0 flex-order-1">
                    <Chips value={newGames} onChange={(e) => setNewGames(e.value)} />
                </div>
            :
            <div className="text-900 w-full md:w-8 md:flex-order-0 flex-order-1">
                {games.map((game, index) => (
                    <Chip label={game} value={game} onClick={() => handleClick(game)} style={{cursor: 'pointer'}} className="mr-2" />
                ))}            
            </div>
            }
            {editable ?
            <div className="w-6 md:w-2 flex justify-content-end">
                { editGames ? 
                    <Button label="Update" icon="pi pi-check" className="p-button-text" onClick={updateEvent}/>
                :
                    <Button label="Edit" icon="pi pi-pencil" className="p-button-text" onClick={() => setEditGames(true)}/>
                }
            </div>
            : null }
        </li>
        <li className="flex align-items-center py-3 px-2 border-top-1 border-300 flex-wrap">
            <div className="text-500 w-6 md:w-2 font-medium">Location</div>
            {editLocation ?
                <div className="text-900 w-full md:w-8 md:flex-order-0 flex-order-1">
                <Container style={{'width': '200px'}}>
                    <Row>
                    <InputText value={newAddressLine1} onChange={(e) => setNewAddressLine1(e.target.value)} />
                    </Row>
                    <Row>
                    <InputText value={newAddressLine2} placeholder="Apt/Condo/Floor" onChange={(e) => setNewAddressLine2(e.target.value)} />
                    </Row>
                    <Row>
                    <InputText value={newCity} onChange={(e) => setNewCity(e.target.value)} />
                    </Row>
                    <Row>
                    <Dropdown
                        value={newState}
                        options={stateSelectItems}
                        onChange={(e) => setNewState(e.target.value)}
                        placeholder="State*"
                    />
                    </Row>
                    <Row>
                    <InputText keyfilter="int" value={newZip} onChange={(e) => setNewZip(e.target.value)} />
                    </Row>
                </Container>
                </div>
            
            : 
                <div className="text-900 w-full md:w-8 md:flex-order-0 flex-order-1">
                {eventDetail.address_1 + " " + eventDetail.address_2 + " " + eventDetail.city + " " + eventDetail.state + ", " + eventDetail.zip_code}
                </div>
            }
            {editable ?
                <div className="w-6 md:w-2 flex justify-content-end">
                    { editLocation ? 
                        <Button label="Update" icon="pi pi-check" className="p-button-text" onClick={updateEvent}/>
                    :
                        <Button label="Edit" icon="pi pi-pencil" className="p-button-text" onClick={() => setEditLocation(true)}/>
                    }
                </div>
            : null }
        </li>
        <li className="flex align-items-center py-3 px-2 border-top-1 border-300 flex-wrap">
            <div className="text-500 w-6 md:w-2 font-medium">Date/Time</div>
            {editTime ?
                <div className="text-900 w-full md:w-8 md:flex-order-0 flex-order-1">
                <Container style={{'width': '300px'}}>
                <Row>
                    <label>Start Time/Date</label>
                    <Calendar
                        baseZIndex={ 5001 }
                        dateFormat="mm/dd/yy"
                        mask="99/99/9999"
                        showIcon
                        minDate={new Date()}
                        maxDate={eventEndDate}
                        hourFormat="12"
                        showTime={true}									
                        value={startTime}
                        onChange={(e) => {
                            setNewStartTime(e.target.value);
                            setEventStartDate(e.target.value);
                            }
                        }
                        showButtonBar
                    />
                </Row>
                <Row style={{'margin-top': '20px'}}>
                    <label>End Time/Date</label>
                    <Calendar
                        baseZIndex={ 5001 }
                        dateFormat="mm/dd/yy"
                        mask="99/99/9999"
                        showIcon
                        hourFormat="12"
                        minDate={eventStartDate}
                        showTime={true}	
                        value={endTime}
                        onChange={(e) =>
                            setNewEndTime(e.target.value)
                        }
                        showButtonBar
                    />
                </Row>
                </Container>
                </div>
            :
            <div className="text-900 w-full md:w-8 md:flex-order-0 flex-order-1">
            {startTime + ' - ' + endTime}
            </div>
            }
            {editable ?
            <div className="w-6 md:w-2 flex justify-content-end">
                { editTime ? 
                    <Button label="Update" icon="pi pi-check" className="p-button-text" onClick={updateEvent}/>
                :
                    <Button label="Edit" icon="pi pi-pencil" className="p-button-text" onClick={() => setEditTime(true)}/>
                }
            </div>
            : null }
        </li>
        <li className="flex align-items-center py-3 px-2 border-top-1 border-300 flex-wrap">
            <div className="text-500 w-6 md:w-2 font-medium">Current Number of Attendees / Max Attendees</div>
            {editMaxAttendees ?
                <div className="text-900 w-full md:w-8 md:flex-order-0 flex-order-1">
                <InputNumber
                    showButtons
                    value={newMaxAttendees}
                    placeholder="Max attendees"
                    onValueChange={(e) => setNewMaxAttendees(e.target.value)}
                    min={1}
                    max={500}
                />
                </div>
            :
                <div className="text-900 w-full md:w-8 md:flex-order-0 flex-order-1">
                {eventDetail.peeps + ' / ' + eventDetail.max_attendees}
                </div>
            }
            {editable ?
            <div className="w-6 md:w-2 flex justify-content-end">
                { editMaxAttendees ? 
                    <Button label="Update" icon="pi pi-check" className="p-button-text" onClick={updateEvent}/>
                :
                    <Button label="Edit" icon="pi pi-pencil" className="p-button-text" onClick={() => setEditMaxAttendees(true)}/>
                }
            </div>
            : null }
        </li>
        <li className="flex align-items-center py-3 px-2 border-top-1 border-300 flex-wrap">
            <div className="text-500 w-6 md:w-2 font-medium">Event Public Status</div>
            {editPrivate ? 
                <div className="text-900 w-full md:w-8 md:flex-order-0 flex-order-1">
                    <SelectButton
                    value={newPrivate}
                    options={ isPrivateSelect }
                    onChange={(e) => setNewPrivate(e.target.value)}
                    ></SelectButton>
                </div>
            :
            <>
                {newPrivate ?
                    <div className="text-900 w-full md:w-8 md:flex-order-0 flex-order-1">Private</div>
                :
                    <div className="text-900 w-full md:w-8 md:flex-order-0 flex-order-1">Public</div>
                }
            </>
            }
            {editable ?
            <div className="w-6 md:w-2 flex justify-content-end">
                { editPrivate ? 
                    <Button label="Update" icon="pi pi-check" className="p-button-text" onClick={updateEvent}/>
                :
                    <Button label="Edit" icon="pi pi-pencil" className="p-button-text" onClick={() => setEditPrivate(true)}/>
                }
            </div>
            : null }
        </li>
    </ul>
    {user && <div><EventDetailButtons eventDetail={eventDetail} user={user} setDeleteChannelInformation={setDeleteChannelInformation} setLeaveChannelInformation={setLeaveChannelInformation} attending={attending} setJoinEventInformation={setJoinEventInformation}/></div>}
</div>
 )
}