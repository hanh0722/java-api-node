const throwError = (message, code) => {
    const error = new Error(message || "Cannot get data from server");
    error.code = code || 500;
    throw error;
}

module.exports = throwError;