/*
 * Module dependencies
 */

const express = require("express");
const cors = require("cors");

/*
 * Configuration
 */

const connection = require("./src/config/mongoose");
const logger = require("./src/config/logger")(module);
const { SERVER_PORT } = require("./src/config/env");

/*
 * Routes
 */
const UserRoute = require("./src/routes/users");
const PaymentRoute = require("./src/routes/payments");

/*
 * Initialise Express App
 */

const app = express();
app.use(express.json({ type: "*/*" }));
app.use(cors());

/*
 * Register Routes
 */

app.use("/users", UserRoute);
app.use("/payments", PaymentRoute);

/*
 * Express Entrypoint
 */

app.listen(SERVER_PORT, () => {
  logger.info(`Server is running on Port: ${SERVER_PORT}`);
});
