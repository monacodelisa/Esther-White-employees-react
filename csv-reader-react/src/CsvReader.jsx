import React, { useState, useRef} from "react";
import Papa from "papaparse";

const FileUpload = () => {
	const [file, setFile] = useState(null);
	const [tableData, setTableData] = useState([]);
    const [setFileName] = useState("No file chosen");
    const fileInputRef = useRef(null);

	const handleFileUpload = (e) => {
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
		};
	};

	const clearTableData = () => {
		setFile(null);
		setTableData([]);
        setFileName("No file chosen");
        fileInputRef.current.value = null;
	};

	return (
		<div>
			<input type="file" ref={fileInputRef} onChange={(e) => handleFileUpload(e)} />
			<button onClick={() => parseCSVData()}>Submit</button>
			{tableData.length === 0 ? (<p>No data to display</p>) : (
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
			<button onClick={() => clearTableData()}>Clear</button>
		</div>
	);
};

export default FileUpload;

