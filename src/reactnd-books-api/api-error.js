const ExtendableError = require('es6-error');

class ApiError extends ExtendableError {
  constructor(message = 'Api Error') {
    super(message);
  }
}

module.exports = ApiError;
