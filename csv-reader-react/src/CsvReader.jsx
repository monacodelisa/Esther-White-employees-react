import React, { useState, useRef } from "react";
import Papa from "papaparse";
import "./CsvReader.scss";

const FileUpload = () => {
	const [file, setFile] = useState(null);
	const [tableData, setTableData] = useState([]);
	const [fileName, setFileName] = useState("No file chosen");
	const fileInputRef = useRef(null);
	const [isDataLoaded, setIsDataLoaded] = useState(false);
	const [isButtonDisabled, setIsButtonDisabled] = useState(false);

	const handleFileUpload = (e) => {
		let selectedFile = e.target.files[0];
			if (selectedFile && selectedFile.type === 'text/csv' || selectedFile.name.endsWith('.csv')) {
				setFile(selectedFile);
				setFileName(selectedFile.name);
				setIsButtonDisabled(false);
			} else {
				setIsButtonDisabled(true);
				alert('Please select a valid CSV file');
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
			<button onClick={() => isDataLoaded ? clearTableData(): parseCSVData()} disabled={isButtonDisabled}>
				{isDataLoaded ? "Clear" : "Submit"}
			</button>
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
		</div>
	);
};

export default FileUpload;
