import React from "react";
import { BrowserRouter } from "react-router-dom";

import "semantic-ui-css/semantic.min.css";

import Menu from "./components/menu/Menu";

import ViewPort from "./components/view/ViewPort";

import CarInsuranceForm from "./components/car-insurance/CarInsuranceForm";
import CarInsuranceError from "./components/car-insurance/CarInsuranceError";

import PaymentForm from "./components/payments/PaymentForm";
import PaymentError from "./components/payments/PaymentError";

const views = [
  {
    path: "/payments",
    label: "Payments",
    header: "Payments",
    component: PaymentForm,
  },
  {
    path: "/payments/error",
    label: "Payments Error",
    header: "500: Internal Server Error",
    component: PaymentError,
  },
  {
    path: "/car-insurance",
    label: "Car Insurance",
    header: "Car Insurance",
    component: CarInsuranceForm,
  },
  {
    path: "/car-insurance/error",
    label: "Car Insurance Error",
    header: "500: Internal Server Error",
    component: CarInsuranceError,
  },
];

function App() {
  return (
    <BrowserRouter>
      <Menu />
      <ViewPort views={views} />
    </BrowserRouter>
  );
}

export default App;
