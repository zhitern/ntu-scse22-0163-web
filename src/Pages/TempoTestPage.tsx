import React from 'react';
import { Link } from "react-router-dom";

function TempoTestPage() {
  return (
    <div className="TempoTestPage">
      <header className="TempoTestPage-header">
      <body>Tempo Page
        <br></br>
      <Link to="/MainPage">
        <button>Go to MainPage</button>
      </Link>
      <br></br>
      <Link to="/AlgoShowcasePage">
        <button>Go to AlgoShowcasePage</button>
      </Link>


      </body>
      
      </header>
    </div>
  );
}

export default TempoTestPage;