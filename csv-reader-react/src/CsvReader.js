import {useState } from 'react'

export default function CsvReader() {
    const [csvFile, setCsvFile] = useState();
    const [csvArray, setCsvArray] = useState([]);

    // make an array of objects with values corresponding to the data 

    const processCSV = (str, delim=",") => {
        const headers = str.slice(0, str.indexOf('\n')).split(delim);
        
        const rows = str.slice(str.indexOf('\n')+1).split('\n');

        const newArray = rows.map( row => {
            const values = row.split(delim);
            const eachObj = headers.reduce((obj, header, i) => {
                obj[header] = values[i];
                return obj;
            },{})
            return eachObj;
        })

        setCsvArray(newArray);
    }

    const submit = () => {
        const file = csvFile;
        const reader = new FileReader();

        reader.onload = function(e) {
            const text = e.target.result;
            console.log(text);
            processCSV(text);
        }

        reader.readAsText(file);
    }

    return (
        <form id='csv-form'>
            <input 
            type='file' 
            accept='.csv' 
            id='csv-file'
            onChange={(e) =>{
                setCsvFile(e.target.files[0])
            }}
            >
            </input>
            <button
            onClick={(e)=> {
                e.preventDefault()
                if(csvFile)submit()

                
            }}
            >
                Submit
            </button>
            {csvArray.length > 0 ? 
            <>
                <table>
                    <thead>
                        <th>EmpID</th>
                        <th>ProjectID</th>
                        <th>DateFrom</th>
                        <th>DateTo</th>
                    </thead>
                    <tbody>
                        {
                            csvArray.map((item, i) => (
                                <tr key={i}>
                                    <td>{item.EmpID}</td>
                                    <td>{item.ProjectID}</td>
                                    <td>{item.DateFrom}</td>
                                    <td>{item.DateTo}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </> 
            : null}
        </form>
    );
}