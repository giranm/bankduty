/*
 * Module dependencies
 */
const Payments = require("../models/payments");
const { Router } = require("express");
const logger = require("../config/logger")(module);
const { v1: uuidv1 } = require("uuid");

/*
 * Configuration
 */
const { API_RESULT_LIMIT } = require("../config/env");

/**
 * Payment Routes
 */

const router = Router();
router.get("/", (req, res) => {
  logger.info(`GET: /payments <> headers: ${JSON.stringify(req.headers)}`);

  // Extract query params
  let { query } = req;
  if (Object.keys(query).length)
    logger.info(`GET: /payments <> params: ${JSON.stringify(query)}`);

  // Obtain payments from MongoDB via Schema
  Payments.find(query, null, { limit: API_RESULT_LIMIT }, (err, result) => {
    if (err) {
      logger.error(err);
      res.status(400);
      res.json({ err });
    } else {
      logger.info(`Number of Payments: ${JSON.stringify(result.length)}`);
      res.status(200);
      res.json({ result });
    }
  });
});

router.post("/", (req, res) => {
  logger.info(`POST: /payments <> headers: ${JSON.stringify(req.headers)}`);

  // Extract body, add UUID, and insert to collection.
  if (Object.keys(req.body).length) {
    let paymentDocument = req.body;
    paymentDocument.transactionId = uuidv1();

    Payments.create(paymentDocument, (err, result) => {
      if (err) {
        logger.error(err);
        res.status(400);
        res.json({ err });
      } else {
        logger.debug(`Payment: ${JSON.stringify(result)}`);
        res.status(201);
        res.json({ result });
      }
    });
  } else {
    let errorMessage = "No payment in JSON payload";
    logger.error(errorMessage);
    res.status(400);
    res.json({ err: errorMessage });
  }
});

/**
 * Mock Payment Failure
 */
router.post("/mock", (req, res) => {
  logger.info(
    `POST: /payments/mock <> headers: ${JSON.stringify(req.headers)}`
  );
  Payments.create(null, (err, result) => {
    if (err) {
      try {
        throw new Error("Unable to commit transaction");
      } catch (exception) {
        logger.error(exception);
        res.status(500);
        res.json({ error: exception.stack });
      }
    }
  });
});

/**
 * Register
 */

module.exports = router;
