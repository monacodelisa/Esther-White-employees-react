import { Helmet } from 'react-helmet';
import logo from './logo.svg';
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
        <img src={logo} className="App-logo" alt="logo" />
      </Helmet>

      <header className="App-header">
        <CsvReader/>
      </header>
    </div>
  );
}

export default App;
