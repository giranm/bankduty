import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import {
  Container,
  Segment,
  Header,
  Form,
  Button,
  Divider,
  Loader,
  Dimmer,
} from 'semantic-ui-react';

import { VEHICLE_TYPES, USAGE_TYPES } from './DropdownOptions';

import {
  pipelineDeployment,
  insuranceQuoteFailure,
  insuranceQuoteTimeout,
  highCPU,
  customerIssues,
} from '../../services/mock-errors/errors';

const CarInsuranceForm = () => {
  // Declare React Hook and State.
  const [processing, setProcessing] = useState(false);
  let history = useHistory();

  return (
    <Container>
      {/* Vehicle + Driver Details */}
      <Segment.Group horizontal>
        <Segment color="blue">
          <Header as="h3">Vehicle Details</Header>
          <Form>
            <Form.Select
              label="Type"
              options={VEHICLE_TYPES}
              placeholder={VEHICLE_TYPES[0].value}
            />
            <Form.Input label="Registration" placeholder="e.g. DY19 IWP" />
            <Form.Select
              label="Usage"
              options={USAGE_TYPES}
              placeholder={USAGE_TYPES[0].value}
            />
          </Form>
        </Segment>
        <Segment color="blue">
          <Header as="h3">Driver Details</Header>
          <Form>
            <Form.Input label="Main Driver Name" placeholder="Edward Smith" />
            <Form.Input
              label="Number of additional drivers"
              type="number"
              placeholder="1"
            />
            <Form.Checkbox label="There have been no outstanding claims in the last 3 years for the main driver" />
          </Form>
        </Segment>
      </Segment.Group>
      <Divider hidden />

      {/* Submit */}
      <Form.Checkbox
        label="I can confirm the above insurance details are correct"
        required
      />
      <Divider hidden />
      <Button
        color="green"
        size="huge"
        fluid
        onClick={() => processInsurance({ history, setProcessing })}
      >
        Get Quote
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
const processInsurance = ({ history, setProcessing }) => {
  // Enable loading icon
  setProcessing(true);

  // Fire off calls on a given schedule.
  setTimeout(pipelineDeployment, 1000);
  setTimeout(insuranceQuoteFailure, 3000);
  setTimeout(insuranceQuoteTimeout, 5000);
  setTimeout(highCPU, 5000);
  setTimeout(customerIssues, 5500);

  // Move to error page.
  setTimeout(() => history.push('/car-insurance/error'), 7000);
};

export default CarInsuranceForm;
