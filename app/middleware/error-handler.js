const ErrorRenspose = require("../utils/errorResponse");

const errorHandler = (err, req, res, next) => {
    let error = { ...err };

    error.message = err.message;

    // Validation error handler
    if (err.name === 'ValidationError') {
        const message = Object.values(err.errors).map(er => er.message);
        error = new ErrorRenspose(message, 400);
    }

    res.status(error.statusCode || 500).json({
        success: false,
        statusCode: error.statusCode,
        errorType: err.name,
        error: error.message || 'Server Error'
    });
};

module.exports = errorHandler;
