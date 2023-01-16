import {useState } from 'react'

export default function CsvReader() {
    const [csvFile, setCSvFile] = useState();

    const submit = () => {
        const file = csvFile;
        const reader = new FileReader();

        reader.onload = function(e) {
            const text = e.target.result;
            console.log(text);
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
                setCSvFile(e.target.files[0])
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
        </form>
    );
}