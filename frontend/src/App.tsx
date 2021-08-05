import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

import { Route } from "react-router-dom";

import NavBar from "./components/NavBar/NavBar";
import Registration from "./components/Registration/Registration";
import Main from "./components/Main/Main";
import Candidate from "./components/CandidateList/Candidate/Candidate";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Route exact path="/registration">
        <Registration />
      </Route>

      <Route exact path="/candidate/:id" component={Candidate} />

      <Route exact path="/">
        <Main />
      </Route>
    </div>
  );
}

export default App;
