// import fs from "fs";
import winston from "winston";

// const fsPromise = fs.promises;

// async function log(logData) {
//   try {
//     logData = `\n ${new Date().toString()} - Log Data: ${logData}`;

//     logData = fsPromise.appendFile("log.txt", logData);
//   } catch (e) {
//     console.log(e);
//   }
// }

const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  defaultMeta: { service: "request-logging" },
  transports: [new winston.transports.File({ filename: "logs.txt" })],
});

const loggerE = winston.createLogger({
  level: "error",
  format: winston.format.json(),
  defaultMeta: { service: "request-logging" },
  transports: [new winston.transports.File({ filename: "errors.txt" })],
});

const loggerMiddleware = async (req, res, next) => {
  const logData = `${req.url} - ${JSON.stringify(req.body)}`;
  //   await log(logData);
  logger.info(logData);
  next();
};

export const errlogger = async (req, res, next) => {
  const logData = `${req.url} - Errors ${req.err}`;
  loggerE.error(logData);
  return res.status(503).send("Something went wrong, please try later");
};

export default loggerMiddleware;
