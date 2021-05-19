import React, { useEffect, useState } from "react";
import ReactEcharts from "echarts-for-react";
import { Card } from "./Card";
import axios from "axios";
import "./Dashboard.css";

export default function Dashboard() {
	const cloudAccountDetails = JSON.parse(localStorage.getItem("cloudAccount"));
	const [chartData, setChartData] = useState({});
	const [currentBill, setCurrentBill] = useState("");
	const [sub, setSub] = useState("");
	useEffect(() => {
		if(!!cloudAccountDetails){
		axios
			.get(`http://localhost:5000/recommendations`, {
				params: {
					cloud_account: cloudAccountDetails["_id"],
				},
			})
			.then((res) => {
				const xData = [];
				const yData = [];
				let total = 0;

				for (const recommendation of res.data.recommendations) {
					xData.push(recommendation.name);
					yData.push(recommendation.totalPrice);

					if (recommendation.totalPrice) {
						total += recommendation.totalPrice;
					}
				}

				const options = {
					tooltip: {
						trigger: "item",
					},

					xAxis: {
						type: "category",
						data: xData,
					},
					yAxis: {
						type: "value",
						splitLine: false,
					},
					series: [
						{
							data: yData,
							type: "bar",
							barCategoryGap: "90px",
							backgroundStyle: {
								color: "rgba(180, 180, 180, 0.2)",
							},
						},
					],
				};

				axios.get(`http://localhost:5000/cloud-accounts/billing?cloud_account=${cloudAccountDetails["_id"]}`).then((res) => {
					setCurrentBill(`${Math.round(res.data.data.currentBill)}$`);
					setSub(`${Math.round(res.data.data.currentBill - total)}$`);
				});
				setChartData(options);
			});
		}
	}, [cloudAccountDetails]);

	return (
		<>
			<div className="cards-container">
				<Card title="Current Cost" ammount={currentBill}></Card>
				<Card title="Cost After Savings" ammount={sub}></Card>
			</div>
			<ReactEcharts style={{ height: "500px", width:"1200px" }} option={chartData} />
		</>
	);
}
