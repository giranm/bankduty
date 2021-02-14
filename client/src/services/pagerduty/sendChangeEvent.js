import axios from 'axios';

import PD_CONSTANTS from './constants';

// Send Change Event to PagerDuty API
const sendChangeEvent = (payload) => {
  console.log('Submitting Change Event:', payload);
  axios({
    method: 'POST',
    url: PD_CONSTANTS.CHANGE_EVENTS_API,
    headers: {
      'Content-Type': 'application/json',
    },
    data: payload,
  }).then((response) => {
    console.log('Response:', response);
  });
};

export default sendChangeEvent;
