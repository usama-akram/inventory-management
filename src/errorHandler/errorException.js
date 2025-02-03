const { CustomError } = require("../utils/error"); // Import CustomError class
const _ = require("lodash"); // You might need to install lodash using `npm install lodash`

// Error handler middleware
const handleError = (error, req, res, next) => {
  console.error(error);

  // Check if the error is an instance of CustomError
  const isErrorSafeForClient = error instanceof CustomError;

  // Prepare the response object for the client
  const clientError = isErrorSafeForClient
    ? _.pick(error, ["message", "code", "statusCode", "data"]) // Use lodash to pick only the relevant properties
    : {
        message: error?.message || "Something went wrong, please contact our support.",
        code: error?.statusCode || "INTERNAL_ERROR",
        status: error?.statusCode || 500,
        data: {},
      };

  // Send the response back to the client
  res.status(clientError.code).send({ error: clientError });
};

module.exports = handleError;
