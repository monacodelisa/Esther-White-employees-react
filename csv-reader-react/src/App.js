import { Helmet } from 'react-helmet';
import './App.scss';
import './CsvReader';
import CsvReader from './CsvReader';

function App() {
  return (
    <div className="App">
      <Helmet>
        <title>CSV Reader</title>
        <meta name="description" content="App Description" />
        <meta name="theme-color" content="#008f68" />
        
      </Helmet>

      <header className="App-header">
          <CsvReader/>
      </header>
    </div>
  );
}

export default App;
