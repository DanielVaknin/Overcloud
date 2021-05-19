import React from "react";
import "./Card.css";

export function Card(props) {
	return (
		<div className="card-container">
			<div className="card-title">{props.title}</div>
			<div className="card-ammount">{props.ammount}</div>
		</div>
	);
}
