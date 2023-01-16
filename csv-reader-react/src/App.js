import logo from './logo.svg';
import './App.scss';
import { Helmet } from 'react-helmet';

function App() {
  return (
    <div className="App">
      <Helmet>
        <title>CSV Reader</title>
        <meta name="description" content="App Description" />
        <meta name="theme-color" content="#008f68" />
      </Helmet>

      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
