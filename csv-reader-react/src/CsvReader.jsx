import React, { useState } from 'react';
import Papa from 'papaparse';

const FileUpload = () => {
    const [file, setFile] = useState(null);
    const [tableData, setTableData] = useState([]);

    const handleFileUpload = (e) => {
        setFile(e.target.files[0]);
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
                skipEmptyLines: true
            });
            setTableData(data.data);
        };
    };

    return (
        <div>
            <input type="file" onChange={(e) => handleFileUpload(e)} />
            <button onClick={() => parseCSVData()}>Submit</button>
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
        </div>
    );
};

export default FileUpload;





// import React, { useState, useEffect } from 'react';

// export default function CsvReader() {
//     const [csvFile, setCsvFile] = useState();
//     const [csvArray, setCsvArray] = useState([]);

//     useEffect(() => {
//         console.log('csvArray changed',csvArray)
//     },[csvArray])

//     // make an array of objects with values corresponding to the data 

//     const processCSV = (str, delim=",") => {
//         const headers = str.slice(0, str.indexOf('\n')).split(delim);
//         const rows = str.slice(str.indexOf('\n')+1).split('\r\n');

//         const newArray = rows.map( row => {
//             const values = row.split(delim);
//             const eachObj = headers.reduce((obj, header, i) => {
//                 if(values[i] === "" && header === "DateTo") values[i] = "N/A"
//                 obj[header] = values[i];
//                 return obj;
//             },{})
//             return eachObj;
//         })

//         setCsvArray(newArray);
//     }

//     const submit = () => {
//         const file = csvFile;
//         const reader = new FileReader();

//         reader.onload = function(e) {
//             const text = e.target.result;
//             processCSV(text);
//         }

//         reader.readAsText(file);
//     }

//     return (
//         <form id='csv-form'>
//             <input 
//             type='file' 
//             accept='.csv' 
//             id='csv-file'
//             onChange={(e) =>{
//                 setCsvFile(e.target.files[0])
//             }}
//             >
//             </input>
//             <button
//             onClick={(e)=> {
//                 e.preventDefault()
//                 if(csvFile)submit()
//             }}>
//                 Submit
//             </button>

//             {csvArray.length > 0 ? 
//             <>
//                 <table>
//                     <thead>
//                         <tr>
//                             <th>EmpID</th>
//                             <th>ProjectID</th>
//                             <th>DateFrom</th>
//                             <th>DateTo</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {
//                             csvArray.map((item, i) => (
//                                 <tr key={i}>
//                                     <td>{item.EmpID}</td>
//                                     <td>{item.ProjectID}</td>
//                                     <td>{item.DateFrom}</td>
//                                     <td>{item.DateTo}</td>
//                                 </tr>
//                             ))
//                         }
//                     </tbody>
//                 </table>
//             </> 
//             : null}
//         </form>
//     );
// }
