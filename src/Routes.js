import { Route, Switch } from "react-router-dom";
import { DeckDetails } from "./components/Decks/DeckDetails/DeckDetails";
import { Decks } from "./components/Decks/Decks";
import { Review } from "./components/Review/Review";

export function Routes() {
  return (
    <Switch>
      <Route exact path="/">
        Hi
      </Route>
      <Route exact path="/review/:permaLink?">
        <Review />
      </Route>
      <Route exact path="/decks">
        <Decks />
      </Route>
      <Route path="/decks/:permaLink">
        <DeckDetails />
      </Route>
    </Switch>
  );
}
