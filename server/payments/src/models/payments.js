/*
 * Module dependencies
 */

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/**
 * Payment schema
 */

const PaymentSchema = new Schema(
  {
    transactionId: {
      type: String,
      required: true,
      unique: true,
    },
    from: {
      accountNumber: {
        type: String,
        required: true,
      },
    },
    to: {
      name: {
        type: String,
        required: true,
      },
      sortCode: {
        type: String,
        required: true,
      },
      accountNumber: {
        type: Number,
        required: true,
      },
    },
    details: {
      amount: {
        type: Number,
        required: true,
        min: 1.0,
        max: 1000,
      },
      date: {
        type: Date,
        required: true,
      },
      reference: {
        type: String,
        required: true,
      },
    },
  },
  { collection: "transactions", strict: "throw" }
);

/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */

/**
 * Methods
 */

PaymentSchema.method({});

/**
 * Statics
 */

PaymentSchema.static({});

/**
 * Register
 */

module.exports = mongoose.model("Payment", PaymentSchema);
