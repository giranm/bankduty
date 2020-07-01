import axios from "axios";

import PD_CONSTANTS from "./constants";

// Send v2 Event to PagerDuty API
const sendEvent = (payload) => {
  console.log("Submitting Event:", payload);
  // axios({
  //   method: "POST",
  //   url: PD_CONSTANTS.EVENTS_API,
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   data: payload,
  // }).then((response) => {
  //   console.log("Response:", response);
  // });
};

export default sendEvent;
