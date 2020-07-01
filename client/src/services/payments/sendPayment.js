import axios from "axios";

// Send Payment to API.
const sendPayment = (payload = {}) => {
  console.log("Submitting Payment:", payload);

  return axios({
    method: "POST",
    url: "http://localhost:8080/payments/mock",
    headers: {
      "Content-Type": "application/json",
    },
    data: payload,
  });

  // .then((res) => {
  //   return res;
  // })
  // .catch((err) => {
  //   return err.response;
  // });
};

export default sendPayment;
