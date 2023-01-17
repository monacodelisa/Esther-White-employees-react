import { Helmet } from 'react-helmet';
import CsvReader from './CsvReader';
import HeaderComponent from './Header';
import FooterComponent from './Footer';
import { library } from "@fortawesome/fontawesome-svg-core";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faYoutube } from "@fortawesome/free-brands-svg-icons";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";

import './App.scss';

function App() {
  library.add(faLinkedin, faGithub, faYoutube, faTwitter);

  return (
    <div className="App">
      <Helmet>
        <title>CSV Reader</title>
        <meta name="description" content="App Description" />
        <meta name="theme-color" content="#008f68" />
        
      </Helmet>

      <header className="App-header">
          <HeaderComponent/>
          <CsvReader/>
          <FooterComponent/>
      </header>
    </div>
  );
}

export default App;
