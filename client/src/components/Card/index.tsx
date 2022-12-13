import React, { useState } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { motion, LayoutGroup } from "framer-motion";
import Chart from "react-apexcharts";
import { CardType } from "../../types";
import { AiOutlineClose } from "react-icons/ai";

import './style.css';

// parent Card

type CardProps = {
	param: CardType;
	setExpanded: () => void;
}

const Card = (props: CardType) => {
	const [expanded, setExpanded] = useState(false);
	return (
		<LayoutGroup id={props.title}>
			{expanded ? (
				<ExpandedCard param={props} setExpanded={() => setExpanded(false)} />
				) : (
				<CompactCard param={props} setExpanded={() => setExpanded(true)} />
			)}
		</LayoutGroup>
	);
};

// Compact Card
function CompactCard({ param, setExpanded }: CardProps) {
	return (
		<motion.div
			className="CompactCard"
			style={{
			background: param.color.background,
			boxShadow: param.color.boxShadow,
			}}
			layoutId="expandableCard"
			onClick={setExpanded}
		>
			<div className="radialBar">
				<CircularProgressbar
					value={param.barValue}
					text={`${param.barValue}%`}
				/>
				<span>{param.title}</span>
			</div>
			
			<div className="detail">
				{param.icon}
				<span>${param.value}</span>
				<span>Last 24 hours</span>
			</div>
		</motion.div>
	);
}

// Expanded Card
function ExpandedCard({ param, setExpanded }: CardProps) {
	const data: ApexCharts.ApexOptions = {
		chart: {
			type: "area",
			height: "auto",
		},

		fill: {
			colors: ["#000"],
			type: "gradient",
		},
		dataLabels: {
			enabled: false,
		},
		stroke: {
			curve: "smooth",
			colors: ["black"],
		},
		tooltip: {
			x: {
				format: "dd/MM/yy HH:mm",
			},
		},
		grid: {
			show: true,
		},
		xaxis: {
			type: "datetime",
			categories: [
				"2022-09-19T00:00:00.000Z",
				"2022-09-19T01:30:00.000Z",
				"2022-09-19T02:30:00.000Z",
				"2022-09-19T03:30:00.000Z",
				"2022-09-19T04:30:00.000Z",
				"2022-09-19T05:30:00.000Z",
				"2022-09-19T06:30:00.000Z",
			],
		},
	};

	return (
		<motion.div
			className="ExpandedCard"
			style={{
			background: param.color.background,
			boxShadow: param.color.boxShadow,
			}}
			layoutId="expandableCard"
		>
			<div style={{ alignSelf: "flex-end", cursor: "pointer", color: "black", marginTop: '28px' }}>
				<AiOutlineClose onClick={setExpanded} />
			</div>

			<span>{param.title}</span>

			<div className="chartContainer">
				<Chart options={data} series={param.series} type="area" />
			</div>
			
			<span>Last 24 hours</span>
		</motion.div>
	);
}

export default Card;
