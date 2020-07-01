/*
 * Module dependencies
 */

const mongoose = require("mongoose");
const logger = require("./logger")(module);

/*
 * MongoDB Config
 */
const {
  MONGODB_HOST,
  MONGODB_PORT,
  MONGODB_ROOT_USERNAME,
  MONGODB_ROOT_PASSWORD,
  MONGODB_DB_NAME,
} = require("./env");

const MONGODB_URI = `\
mongodb://${MONGODB_ROOT_USERNAME}\
:${MONGODB_ROOT_PASSWORD}\
@${MONGODB_HOST}\
:${MONGODB_PORT}\
/${MONGODB_DB_NAME}`;

/*
 * Connect to MongoDB Instance
 */

logger.info(`Connecting to MongoDB URI: ${MONGODB_URI}`);
mongoose
  .connect(MONGODB_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .catch((error) => logger.error("Unable to connect", error));

/*
 * Obtain connection object and log connection status.
 */
const connection = mongoose.connection;
connection.once("open", () => {
  logger.info("MongoDB database connection established successfully");
});

/**
 * Register
 */

module.exports = connection;
