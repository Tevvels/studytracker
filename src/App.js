import React from 'react';
import './style.scss';
import {BrowserRouter as Router, Route} from "react-router-dom";

import StudyLog from "./components/StudyLog.component";
import LogDay from "./components/LogDay.component";
import EditStudyLog from "./components/EditStudyLog.component";



function App() {
  return (
    <Router>
    <div className="App"></div>
    <Route path="/" exact component={StudyLog}/>
    <Route path="/create" exact component={LogDay}/>
    <Route path="/update/:id" exact component={EditStudyLog}/>

    </Router>
  );
}

export default App;
 