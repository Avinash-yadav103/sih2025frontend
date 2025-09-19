import React from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import "./styles.css";

// Lazy load components
const BasicMap = React.lazy(() => import("./BasicMap"));
const DrawMap = React.lazy(() => import("./DrawMap"));
const PolygonMap = React.lazy(() => import("./PolygonMap"));
const MapWrapper = React.lazy(() => import("./MapWrapper"));

const Maps = () => {
  const { path } = useRouteMatch();
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <Switch>
        <Route path={`${path}/basic`} component={BasicMap} />
        <Route path={`${path}/draw`} component={DrawMap} />
        <Route path={`${path}/polygon`} component={PolygonMap} />
        <Route path={`${path}`} component={MapWrapper} />
      </Switch>
    </React.Suspense>
  );
};

export default Maps;