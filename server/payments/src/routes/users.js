/*
 * Module dependencies
 */
const Users = require("../models/users");
const { Router } = require("express");
const logger = require("../config/logger")(module);

/*
 * Configuration
 */
const { API_RESULT_LIMIT } = require("../config/env");

/**
 * User Routes
 */

const router = Router();
router.get("/", (req, res) => {
  logger.info(`GET: /users <> headers: ${JSON.stringify(req.headers)}`);

  // Extract query params
  let { query } = req;
  if (Object.keys(query).length)
    logger.info(`GET: /users <> params: ${JSON.stringify(query)}`);

  // Obtain users from MongoDB via Schema
  Users.find(query, null, { limit: API_RESULT_LIMIT }, (err, result) => {
    if (err) {
      logger.error(err);
      res.status(400);
      res.json({ err });
    } else {
      logger.debug(`User(s): ${JSON.stringify(result)}`);
      res.status(200);
      res.json({ result });
    }
  });
});

router.post("/", (req, res) => {
  logger.info(`POST: /users <> headers: ${JSON.stringify(req.headers)}`);

  // Extract body and insert users into collection.
  let { body } = req;
  if (Object.keys(req).length && body.users && body.users.length) {
    let newUsers = body.users;
    Users.insertMany(newUsers, (err, result) => {
      if (err) {
        logger.error(err);
        res.status(400);
        res.json({ err });
      } else {
        logger.debug(`User(s): ${JSON.stringify(result)}`);
        res.status(201);
        res.json({ result });
      }
    });
  } else {
    let errorMessage = "No users in JSON payload";
    logger.error(errorMessage);
    res.status(400);
    res.json({ err: errorMessage });
  }
});

/**
 * Register
 */

module.exports = router;
