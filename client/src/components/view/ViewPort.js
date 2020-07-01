import React from "react";
import { Switch, Route } from "react-router-dom";

import { Container, Header, Divider } from "semantic-ui-react";

const ViewPort = ({ views }) => {
  return (
    <Container style={{ marginTop: "7em" }}>
      <Switch>
        {views.map(({ path, header, component: Component }) => (
          <Route key={path} path={path} exact>
            <Header as="h1">{header}</Header>
            <Divider />
            <Component />
          </Route>
        ))}
      </Switch>
    </Container>
  );
};

export default ViewPort;
