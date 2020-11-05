import { Route, Switch } from "react-router-dom";
import { DeckDetails } from "./Decks/DeckDetails/DeckDetails";
import { Decks } from "./Decks/Decks";
import { ReviewMain } from "./Shared/ReviewMain";

export function Routes() {
  return (
    <Switch>
      <Route exact path="/">
        Hi
      </Route>
      <Route exact path="/review">
        <ReviewMain />
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
