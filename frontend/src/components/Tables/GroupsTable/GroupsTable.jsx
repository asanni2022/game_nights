import React, { useState, useEffect, useRef } from "react";
import { Button } from "primereact/button";
import { ListBox } from "primereact/listbox";
import { Panel } from "primereact/panel";
// import { TabView, TabPanel } from 'primereact/tabview';
// import './TabViewDemo.css';
import "./GroupsTable.css";
import axios from "axios";
import { Accordion, AccordionTab } from "primereact/accordion";
import { useNavigate } from "react-router-dom";

export default function GroupsTable(props) {
	// const [activeIndex2, setActiveIndex2] = useState(0)
	// const scrollableTabs = Array.from({ length: 50 }, (_, i) => ({ title: `Tab ${i + 1}`, content: `Tab ${i + 1} Content` }));
	const [selectedGroup, setSelectedGroup] = useState(null);
	const [groupCode, setGroupCode] = useState();
	const [activeIndex, setActiveIndex] = useState(null);
	const nav = useNavigate();
	let groups = [];
	const handleButtonClick = (endLink) => {
		const navLink = "/groups/" + endLink + "/";
		nav(navLink);
	};
	// let scrollGroups=[]
	// props.groups now has group name and code
	if (props.groups) {
		for (let group of props.groups) {
			// let tempGroup = {
			// 	groupName: group[0],
			// 	// group[2] = all the other members
			// 	groupCode: group[1],
			// };
			let tempGroup = (
				<Button
					style={{ width: "100%" }}
					className="p-button-text"
					label={group[0]}
					onClick={() => handleButtonClick(group[1])}
				></Button>
			);
			groups.push(tempGroup);
		}
	} else {
		// groups = [{ groupName: "None" }];
		console.log("there's an error");
	}

	return (
		<div>
			<Panel header="Your Groups">
				<ListBox
					// value={groupCode}
					options={groups}
					// onChange={(e) => {
					// 	setGroupCode(e.value);
					// 	console.log("group code: ", groupCode);
					// }}
					// onClick={(e) => handleChange(e.value)}
					// optionLabel="groupName"
					// optionValue="groupCode"
					style={{ width: "100%" }}
					listStyle={{ maxHeight: "250px" }}
				/>
			</Panel>
		</div>
	);
}
