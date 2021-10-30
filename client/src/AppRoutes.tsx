import * as React from "react";
import { Redirect, Route, Switch } from "react-router";
import Contact from "./components/contact/contact";

export const AppRoutes: React.FC = () => (
  <Switch>
    <Redirect exact={true} from={`/`} to={"/contact"} />
    <Route exact={true} path={"/contact"} component={Contact} />
  </Switch>
);
