import React, { useState, useEffect } from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import axios from "axios";
import "./GameModal.css";

export default function GameModal({ gameName }) {
	const [gameInfo, setGameInfo] = useState(null);

	useEffect(() => {
		axios
			.get("/games", {
				params: {
					name: gameName,
				},
			})
			.then((response) => {
				// console.log('receiving info', response.data.games[0])
				setGameInfo(response.data.games[0]);
			});
	}, [gameName]);

	return (
		<div>
			{gameInfo && (
				<Card
					title={gameInfo.name}
					header={<img src={gameInfo.thumb_url}></img>}
				>
					{" "}
					{gameInfo.description_preview}
				</Card>
			)}
		</div>
	);
}
