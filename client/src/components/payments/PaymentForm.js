import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import {
  Container,
  Segment,
  Header,
  Form,
  Label,
  Button,
  Message,
  Divider,
  Loader,
  Dimmer,
} from "semantic-ui-react";
import SemanticDatepicker from "react-semantic-ui-datepickers";

import accounts from "./Accounts";

import {
  paymentTransactionFailure,
  paymentTransactionTimeout,
  highCPU,
  customerIssues,
} from "../../services/mock-errors/errors";

import "react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css";

const PaymentForm = () => {
  // Declare React Hook and State.
  const [processing, setProcessing] = useState(false);
  let history = useHistory();

  return (
    <Container>
      {/* From and To */}
      <Segment.Group horizontal>
        <Segment color="blue">
          <Header as="h3">From</Header>
          <Form>
            <Form.Select
              label="Source Account"
              options={accounts}
              placeholder={accounts[0].value}
            />
            <Segment raised>
              <Label as="a" color="blue" ribbon>
                Account Balance
              </Label>
              <Message positive size="large" style={{ "text-align": "right" }}>
                <b>£3,402.23</b>
              </Message>
            </Segment>
          </Form>
        </Segment>
        <Segment color="blue">
          <Header as="h3">To</Header>
          <Form>
            <Form.Group widths="equal">
              <Form.Input label="Name" placeholder="Edward Smith" />
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Input label="Sort Code" placeholder="40-12-76" />
              <Form.Input label="Account Number" placeholder="72873892" />
            </Form.Group>
          </Form>
        </Segment>
      </Segment.Group>

      {/* Details */}
      <Segment color="teal">
        <Header as="h3">Payment Details</Header>
        <Form>
          <Form.Group widths="equal">
            <Form.Input label="Amount (£)" type="number" placeholder="100.00" />
            <SemanticDatepicker
              label="Date"
              format="DD-MM-YYYY"
              onChange={() => {}}
            />
          </Form.Group>
          <Form.Input label="Reference" placeholder="Petrol" />
        </Form>
      </Segment>
      <Divider hidden />

      {/* Submit */}
      <Form.Checkbox
        label="I can confirm the above payment details are correct"
        required
      />
      <Divider hidden />
      <Button
        color="green"
        size="huge"
        fluid
        onClick={() => processPayment({ history, setProcessing })}
      >
        Submit Payment
      </Button>

      {/* Loader */}
      <Dimmer active={processing} inverted>
        <Loader size="huge" inverted>
          Processing
        </Loader>
      </Dimmer>
    </Container>
  );
};

// Process Payment Logic
const processPayment = ({ history, setProcessing }) => {
  // Enable loading icon
  setProcessing(true);

  // Fire off calls on a given schedule.
  setTimeout(paymentTransactionFailure, 3000);
  setTimeout(paymentTransactionTimeout, 5000);
  setTimeout(highCPU, 5000);
  setTimeout(customerIssues, 5500);

  // Move to error page.
  setTimeout(() => history.push("/payments/error"), 7000);
};

export default PaymentForm;
