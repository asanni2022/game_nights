import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { ListBox } from "primereact/listbox";
import { Panel } from "primereact/panel";

import axios from "axios";
import GroupRequestFormSpecific from "../components/Forms/GroupRequestForm/GroupRequestFormSpecific";

export default function GroupDetailPage(props) {
	const { groupId } = useParams();
	const [groupName, setGroupName] = useState("");
	const [groupCode, setGroupCode] = useState(null);
	const [groupMembers, setGroupMembers] = useState([{ label: "me" }]);
	const [member, setMember] = useState(null);
	const nav = useNavigate();

	useEffect(() => {
		axios.get(`/groups/${groupId}`).then((response) => {
			const group_info = response.data.group_info[0];
			setGroupName(group_info[0]);
			setGroupCode(group_info[1]);
			setGroupMembers(group_info[2]);
		});
	}, []);

	const leaveGroup = function (name, code) {
		axios.put("/group/leave", { code: code }).then((response) => {
			console.log("leave group response.data", response.data);
			let channelId = "GroupChatroom";
			let channelName = name;
			channelName += " Chatroom";
			channelId += code.toString();
			props.setLeaveChannelInformation([channelId, channelName]);
			if (response.data.group_deleted) {
				props.setDeleteChannelInformation([channelId, channelName]);
			}
		});
		nav("/groups/");
	};

	let members = [];
	if (groupMembers.length > 0) {
		for (let aMember of groupMembers) {
			console.log("member: ", aMember);
			let tempList = { label: aMember };
			members.push(tempList);
		}
	} else {
		console.log("error in groupMembers");
	}

	// 35164354
	return (
		<Container>
			<Row>
				<Col xs={3}></Col>
				<Col xs={6}>
					<h1 style={{ margin: "20px" }}>Group Information</h1>
					<hr />

					<Panel header={groupName}>
						<ListBox options={groupMembers} />
					</Panel>
					<Button
						style={{ margin: "15px" }}
						onClick={() => {
							leaveGroup(groupName, groupCode);
						}}
					>
						Leave Group
					</Button>
					<GroupRequestFormSpecific
						name={groupName}
						code={groupCode}
					/>
				</Col>
				<Col xs={3}></Col>
			</Row>
		</Container>
	);
}
