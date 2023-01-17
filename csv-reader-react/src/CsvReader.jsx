import React, { useState, useRef } from "react";
import Papa from "papaparse";
import "./CsvReader.scss";

const findLongestWorkingPair = (tableData) => {
    let longestPair = { emp1: null, emp2: null, daysWorked: 0 };

    for (let i = 0; i < tableData.length; i++) {
        for (let j = i + 1; j < tableData.length; j++) {
            let emp1 = tableData[i];
            let emp2 = tableData[j];

            if (emp1.EmpID !== emp2.EmpID && emp1.ProjectID === emp2.ProjectID) {
				let dateFrom1 = Date.parse(emp1.DateFrom);
				let dateTo1 = Date.parse(emp1.DateTo);
				let dateFrom2 = Date.parse(emp2.DateFrom);
				let dateTo2 = Date.parse(emp2.DateTo);
				
				if(isNaN(dateFrom1) || isNaN(dateTo1) || isNaN(dateFrom2) || isNaN(dateTo2)){
                    console.log("Invalid date format")
					continue;
				}
				
				let daysWorked = Math.min(dateTo1, dateTo2) - Math.max(dateFrom1, dateFrom2);
				
				if (daysWorked > longestPair.daysWorked) {
					longestPair = {
						emp1: emp1.EmpID,
						emp2: emp2.EmpID,
						daysWorked,
					};
				}
            }
        }
    }

    return `${longestPair.emp1}, ${longestPair.emp2}, ${longestPair.daysWorked}`;
};


const FileUpload = () => {
	const [file, setFile] = useState(null);
	const [tableData, setTableData] = useState([]);
	const [fileName, setFileName] = useState("No file chosen");
	const fileInputRef = useRef(null);
	const [isDataLoaded, setIsDataLoaded] = useState(false);
	const [isButtonDisabled, setIsButtonDisabled] = useState(false);
	const [longestWorkingPair, setLongestWorkingPair] = useState(null);

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

	const handleLongestWorkingPair = () => {
		const result = findLongestWorkingPair(tableData);
		setLongestWorkingPair(result);
	};

	return (
		<div className="container">
			<input
				type="file"
				ref={fileInputRef}
				onChange={(e) => handleFileUpload(e)}
			/>
			<button
				onClick={() =>
					isDataLoaded ? clearTableData() : parseCSVData()
				}
				disabled={isButtonDisabled}
			>
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
			{isDataLoaded && (
				<>
					<button onClick={handleLongestWorkingPair}>
						Worked Together Longest
					</button>
					{longestWorkingPair && <p>{longestWorkingPair}</p>}
				</>
			)}
		</div>
	);
};

export default FileUpload;
