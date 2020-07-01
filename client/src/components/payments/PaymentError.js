import React, { useEffect, useState } from "react";

import { Container, Segment, Header, Icon } from "semantic-ui-react";

import { cloudWatchBill, outOfMemory, lowRevenue } from "./mock-errors/errors";

import sendPayment from "../../services/payments/sendPayment";

const PaymentError = () => {
  const [response, setData] = useState({ data: { error: "" } });

  // Send additional alerts on error page transition.
  useEffect(() => {
    const fetchdata = async () => {
      try {
        const result = await sendPayment({});
        setData(result.data);
      } catch (error) {
        setData(error.response);
      }
    };
    fetchdata();
    // // AWS CloudWatch Bill
    // setTimeout(cloudWatchBill, 30000);
    // // Payment & Order Management Incidents
    // setTimeout(outOfMemory, 60000);
    // setTimeout(lowRevenue, 60000);
  }, []);

  return (
    <Container>
      <Segment.Group>
        <Segment textAlign="center" color="red" inverted>
          <Icon name="warning circle" size="huge" />
          <Header as="h2">
            Unable to process payment, please try again later
          </Header>
        </Segment>
        {/* <pre>
          {`
        javax.persistence.PersistenceException: org.hibernate.exception.GenericJDBCException: Unable to acquire JDBC Connection
              Caused by: org.hibernate.exception.GenericJDBCException: Unable to acquire JDBC Connection
              at org.hibernate.internal.ExceptionConverterImpl.convert(ExceptionConverterImpl.java:149)
              at org.hibernate.internal.ExceptionConverterImpl.convert(ExceptionConverterImpl.java:157)
              at org.hibernate.query.internal.AbstractProducedQuery.list(AbstractProducedQuery.java:1423)
              at org.hibernate.query.Query.getResultList(Query.java:146)
              ... 108 more`}
        </pre> */}
        <pre>{response.data.error}</pre>
      </Segment.Group>
    </Container>
  );
};

export default PaymentError;
