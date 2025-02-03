class CustomError extends Error {
  constructor(message, code = "INTERNAL_ERROR", status = 500, data = {}) {
    super(message);
    this.name = this.constructor.name;
    this.message = message;
    this.code = code;
    this.status = status;
    this.data = data;
  }
}

class RouteNotFoundError extends CustomError {
  constructor(originalUrl) {
    super(`Route '${originalUrl}' does not exist.`, "ROUTE_NOT_FOUND", 404);
  }
}

class EntityNotFoundError extends CustomError {
  constructor(entityName) {
    super(`${entityName} not found.`, "ENTITY_NOT_FOUND", 404);
  }
}

class BadUserInputError extends CustomError {
  constructor(errorData) {
    super("There were validation errors.", "BAD_USER_INPUT", 400, errorData);
  }
}

class InvalidTokenError extends CustomError {
  constructor(message = "Authentication token is invalid.") {
    super(message, "INVALID_TOKEN", 401);
  }
}

module.exports = {
  CustomError,
  RouteNotFoundError,
  EntityNotFoundError,
  BadUserInputError,
  InvalidTokenError,
};
