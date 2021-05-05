import React, { useEffect, useState } from "react";
import ReactEcharts from "echarts-for-react";
import axios from "axios";
import './Dashboard.css';

export default function Dashboard() {
	const cloudAccountDetails = JSON.parse(localStorage.getItem("cloudAccount"));
	const [chartData, setChartData] = useState({});
	const [error, setError] = useState("");
	useEffect(() => {
		axios
			.get(`http://localhost:5000/recommendations`, {
				params: {
					cloud_account: cloudAccountDetails["_id"],
				},
			})
			.then((res) => {
                const xData = [];
                const yData = [];

                for (const recommendation of res.data.recommendations) {
                    xData.push(recommendation.name);
                    yData.push(recommendation.totalPrice);
                }

				const options = {
                    tooltip: {
                        trigger: 'item'
                    },

					xAxis: {
						type: "category",
                        data: xData
					},
					yAxis: {
						type: "value",
					},
					series: [
						{
                            data: yData,
							type: "bar",
							showBackground: true,
							backgroundStyle: {
								color: "rgba(180, 180, 180, 0.2)",
							},
						},
					],
				};

                setChartData(options);
			}).catch((e) => {
				//Alert error to the user
				console.log(e);
				setError(e.response.data.error);
				alert(error);
			  });
	}, []);


    
	return (
        
        
		<ReactEcharts
        style={{height: '600px'}}
			option={chartData}
		/>
	);
}
