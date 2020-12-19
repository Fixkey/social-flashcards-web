import { Route, Switch } from "react-router-dom";
import { CategoryRoute } from "./components/Categories/CategoryRoute";
import { Dashboard } from "./components/Dashboard/Dashboard";
import { CreateDeck } from "./components/Decks/CreateDeck";
import { DeckDetails } from "./components/Decks/DeckDetails/DeckDetails";
import { Decks } from "./components/Decks/Decks";
import { Review } from "./components/Review/Review";

export function Routes() {
  return (
    <Switch>
      <Route exact path="/">
        <Dashboard />
      </Route>
      <Route path="/categories">
        <CategoryRoute />
      </Route>
      <Route exact path="/review/:permaLink?">
        <Review />
      </Route>
      <Route exact path="/decks">
        <Decks />
      </Route>
      <Route exact path="/decks/create">
        <CreateDeck />
      </Route>
      <Route path="/decks/id/:permaLink">
        <DeckDetails />
      </Route>
    </Switch>
  );
}
