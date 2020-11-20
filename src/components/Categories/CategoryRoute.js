import { Route, Switch, useRouteMatch } from "react-router-dom";
import { Categories } from "./Categories";
import { Subjects } from "./Subjects";

export function CategoryRoute() {
  const { path } = useRouteMatch();
  return (
    <Switch>
      <Route exact path={path}>
        <Categories />
      </Route>
      <Route path={`${path}/:category`}>
        <Subjects />
      </Route>
    </Switch>
  );
}
