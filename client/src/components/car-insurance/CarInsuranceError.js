import React, { useEffect, useState } from "react";

import { Container, Segment, Header, Icon } from "semantic-ui-react";

import {
  cloudWatchBill,
  creditCheckOutOfMemory,
  lowRevenue,
} from "../../services/mock-errors/errors";

const CarInsuranceError = () => {
  const [response, setData] = useState({ data: { error: "" } });

  // Send additional alerts on error page transition.
  useEffect(() => {
    // AWS CloudWatch Bill
    setTimeout(cloudWatchBill, 30000);

    // Credit Check & Order Management Incidents
    setTimeout(creditCheckOutOfMemory, 60000);
    setTimeout(lowRevenue, 60000);
  }, []);

  return (
    <Container>
      <Segment.Group>
        <Segment textAlign="center" color="red" inverted>
          <Icon name="warning circle" size="huge" />
          <Header as="h2">
            Unable to obtain quote, please try again later
          </Header>
        </Segment>
        <pre>
          {`
        javax.persistence.PersistenceException: org.hibernate.exception.GenericJDBCException: Unable to acquire JDBC Connection
              Caused by: org.hibernate.exception.GenericJDBCException: Unable to acquire JDBC Connection
              at org.hibernate.internal.ExceptionConverterImpl.convert(ExceptionConverterImpl.java:149)
              at org.hibernate.internal.ExceptionConverterImpl.convert(ExceptionConverterImpl.java:157)
              at org.hibernate.query.internal.AbstractProducedQuery.list(AbstractProducedQuery.java:1423)
              at org.hibernate.query.Query.getResultList(Query.java:146)
              ... 108 more`}
        </pre>
      </Segment.Group>
    </Container>
  );
};

export default CarInsuranceError;
