/*
 * Module dependencies
 */

const { createLogger, format, transports } = require("winston");
const path = require("path");

/*
 * Return the last folder name in the path and the calling module's filename.
 */

const getFilepath = (callingModule) => {
  const parts = callingModule.filename.split(path.sep);
  return path.join(parts[parts.length - 2], parts.pop());
};

/**
 * Register console based logger
 */

module.exports = (callingModule) => {
  return createLogger({
    level: "info",
    format: format.combine(
      format.timestamp(() => new Date().getTime()),
      format.label({ label: getFilepath(callingModule) }),
      format.printf(
        ({ level, message, label, timestamp }) =>
          `${timestamp} | ${level} | ${label} | ${message}`
      ),
      format.errors({ stack: true }),
      format.splat()
      // format.json()
    ),
    transports: [new transports.Console()],
  });
};
