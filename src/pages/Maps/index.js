import React from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import "./styles.css";

const BasicMap = React.lazy(() => import("./BasicMap"));
const DrawMap = React.lazy(() => import("./DrawMap"));
const PolygonMap = React.lazy(() => import("./PolygonMap"));

const Maps = () => {
  let { path } = useRouteMatch();
  return (
    <Switch>
      <Route path={`${path}/basic`} component={BasicMap} />
      <Route path={`${path}/draw`} component={DrawMap} />
      <Route path={`${path}/polygon`} component={PolygonMap} />
    </Switch>
  );
};

export default Maps;