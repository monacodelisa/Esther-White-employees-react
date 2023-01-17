import React, { useState, useRef } from "react";
import Papa from "papaparse";
import moment from "moment";
import "./CsvReader.scss";

// const moment = require('moment');

const findLongestWorkingPair = (tableData) => {
	let longestWorkingPair = {};
	let longestWorkingPairDays = 0;

	for (let i = 0; i < tableData.length; i++) {
		for (let j = i + 1; j < tableData.length; j++) {
			console.log(tableData[i].ProjectID);
			if (
				tableData[i].EmpID !== tableData[j].EmpID &&
				tableData[i].ProjectID === tableData[j].ProjectID
			) {
				console.log("hello");
				const dateFrom1 = moment(tableData[i].DateFrom, "YYYY-MM-DD");
				const dateTo1 = moment(tableData[i].DateTo, "YYYY-MM-DD");
				const dateFrom2 = moment(tableData[j].DateFrom, "YYYY-MM-DD");
				const dateTo2 = moment(tableData[j].DateTo, "YYYY-MM-DD");

				const overlapStart = moment.max(dateFrom1, dateFrom2);
				const overlapEnd = moment.min(dateTo1, dateTo2);
				const overlapDays = overlapEnd.diff(overlapStart, "days") + 1;
				console.log(overlapDays);
				if (overlapDays > longestWorkingPairDays) {
					longestWorkingPairDays = overlapDays;
					longestWorkingPair = {
						emp1: tableData[i].EmpID,
						emp2: tableData[j].EmpID,
						days: overlapDays,
					};
				}
			}
		}
	}
	return longestWorkingPair;
};

const FileUpload = () => {
	const [file, setFile] = useState(null);
	const [tableData, setTableData] = useState([]);
	const [fileName, setFileName] = useState("No file chosen");
	const fileInputRef = useRef(null);
	const [isDataLoaded, setIsDataLoaded] = useState(false);
	const [isButtonDisabled, setIsButtonDisabled] = useState(false);
	const [longestWorkingPair, setLongestWorkingPair] = useState({});

	const handleFileUpload = (e) => {
		let selectedFile = e.target.files[0];
		if (
			(selectedFile && selectedFile.type === "text/csv") ||
			selectedFile.name.endsWith(".csv")
		) {
			setFile(selectedFile);
			setFileName(selectedFile.name);
			setIsButtonDisabled(false);
		} else {
			setIsButtonDisabled(true);
			alert("Please select a valid CSV file");
		}
		setFile(e.target.files[0]);
		setFileName(e.target.files[0].name);
	};

	const parseCSVData = () => {
		if (!file) {
			alert("Please select a file to upload.");
			return;
		}
		const reader = new FileReader();
		reader.readAsText(file);
		reader.onload = (e) => {
			const csvData = e.target.result;
			const data = Papa.parse(csvData, {
				header: true,
				skipEmptyLines: true,
			});
			setTableData(data.data);
			setIsDataLoaded(true);
			setLongestWorkingPair(findLongestWorkingPair(data.data));
		};
	};

	const clearTableData = () => {
		setFile(null);
		setTableData([]);
		setFileName("No file chosen");
		fileInputRef.current.value = "";
		setIsDataLoaded(false);
	};

	return (
		<div className="container">
			<input
				type="file"
				ref={fileInputRef}
				onChange={(e) => handleFileUpload(e)}
			/>
			{tableData.length === 0 ? (
				<p>No data to display</p>
			) : (
				<table>
					<thead>
						<tr>
							<th>EmpID</th>
							<th>ProjectID</th>
							<th>DateFrom</th>
							<th>DateTo</th>
						</tr>
					</thead>
					<tbody>
						{tableData.map((row, index) => (
							<tr key={index}>
								<td>{row.EmpID}</td>
								<td>{row.ProjectID}</td>
								<td>{row.DateFrom}</td>
								<td>{row.DateTo}</td>
							</tr>
						))}
					</tbody>
				</table>
			)}
			{isDataLoaded && (
				<>
					<h3>Worked Together & Longest</h3>
					{longestWorkingPair ? (
						<div className="results">
							{longestWorkingPair.emp1},{longestWorkingPair.emp2},
							{longestWorkingPair.days}{" "}
						</div>
					) : (
						<div>No Data</div>
					)}
				</>
			)}
			<button
				onClick={() =>
					isDataLoaded ? clearTableData() : parseCSVData()
				}
				disabled={isButtonDisabled}
			>
				{isDataLoaded ? "Clear" : "Submit"}
			</button>
		</div>
	);
};

export default FileUpload;
