import {useState } from 'react'

function CsvReader() {
    const [csvFile, setCSvFile] = useState();

    return (
        <form id='csv-form'>
            <input 
            type='file' 
            accept='.csv' 
            id='csv-file'
            onChange={(e) =>{
                setCSvFile(e.target.files[0])
            }}
            >
            </input>
            <button>Submit</button>
        </form>
    );
}