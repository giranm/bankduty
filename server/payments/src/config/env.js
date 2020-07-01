/*
 * Module dependencies
 */

const fs = require("fs");
const yargs = require("yargs");
const logger = require("./logger")(module);

/*
 * Custom class to update process.env from custom filepath
 * Ref: https://github.com/olegdovger/pizza-delivery-api/blob/master/lib/env.js
 */

class Env {
  constructor(envPath) {
    this.variables = [];
    this._setup(envPath);
  }

  _setup(envPath) {
    try {
      const data = fs.readFileSync(envPath, {
        encoding: "utf-8",
      });
      const stringArray = data.split("\n");
      this.variables = stringArray.map((string) => {
        const arr = string.split("=");
        return {
          name: arr[0],
          value: arr[1],
        };
      });
    } catch (err) {
      logger.error("Unable to load .env;", err);
    }
  }

  load() {
    this.variables.forEach((variable) => {
      process.env[variable.name] = variable.value;
    });
  }
}

/*
 * Load .env from argv filepath
 */

const argv = yargs.argv;
new Env(argv["envPath"]).load();

/**
 * Register
 */

module.exports = {
  // Node.js
  SERVER_PORT: Number(process.env.NODE_SERVER_PORT) || 8080,
  API_RESULT_LIMIT: Number(process.env.API_RESULT_LIMIT) || 100,

  // MongoDB
  MONGODB_HOST: process.env.MONGODB_HOST || "localhost",
  MONGODB_PORT: Number(process.env.MONGODB_PORT) || 27017,
  MONGODB_ROOT_USERNAME: process.env.MONGODB_ROOT_USERNAME || "root",
  MONGODB_ROOT_PASSWORD: process.env.MONGODB_ROOT_PASSWORD || "example",
  MONGODB_DB_NAME: process.env.MONGODB_DB_NAME || "payments",
};
