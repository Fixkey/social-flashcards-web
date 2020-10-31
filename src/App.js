import { Component } from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import "./App.css";
import { DeckDetails } from "./Decks/DeckDetails/DeckDetails";
import { Decks } from "./Decks/Decks";
import { HeaderMenu } from "./Shared/HeaderMenu";

class App extends Component {
  // eslint-disable-next-line no-useless-constructor
  constructor() {
    super();
    // ... load config
  }

  render() {
    return (
      <Router>
        <HeaderMenu />
        <div className="App">
          <Switch>
            <Route exact path="/">
              Hi
            </Route>
            <Route exact path="/decks">
              <Decks />
            </Route>
            <Route path="/decks/:permaLink">
              <DeckDetails />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
