import winston from "winston";

const customLoggerLevels = {
  levels: {
    fatal: 0,
    error: 1,
    warning: 2,
    info: 3,
    http: 4,
    debug: 5,
  },
  colors: {
    critical: "bold magenta",
    error: "bold red",
    warning: "bold yellow",
    info: "bold blue",
    http: "bold green",
    debug: "bold white",
  },
};

winston.addColors(customLoggerLevels.colors);

export const logger = winston.createLogger({
  levels: customLoggerLevels.levels,
  transports: [
    new winston.transports.Console({
      level: "debug",
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      ),
    }),
  ],
});

// const prodLogger = Winston.createLogger({
//   levels: customLoggerOptions.levels,
//   transports: [
//     new Winston.transports.Console({
//       level: "info",
//       format: Winston.format.combine(
//         Winston.format.colorize(customLoggerOptions.colors),
//         Winston.format.simple()
//       ),
//     }),
//     new Winston.transports.File({
//       level: "error",
//       filename: "./errors.log",
//       format: Winston.format.simple(),
//     }),
//   ],
// });
