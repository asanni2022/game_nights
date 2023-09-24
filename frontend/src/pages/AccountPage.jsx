import { useState, useEffect } from "react";
import axios from "axios";
import EditAccountCard from "../components/Card/EditAccountCard";

export default function AccountPage({ setDeleteUserChannels, client }) {
	const [edit, setEdit] = useState(false);
	const [userInfo, setUserInfo] = useState(null);

	useEffect(() => {
		axios
			.get("whoami")
			.then((response) => {
				setUserInfo(response.data[0].fields);
			})
			.catch((error) => {
				console.error(error);
			});
	}, []);

	return (
		<div>
			<h1 style={{ margin: "20px" }}>Your Account</h1>
			<hr />
			{userInfo && (
				<EditAccountCard
					userInfo={userInfo}
					setEdit={setEdit}
					edit={edit}
					setDeleteUserChannels={setDeleteUserChannels}
					client={client}
				/>
			)}
		</div>
	);
}
